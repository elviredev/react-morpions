export default {
  meta: {
    type: 'layout',
    docs: {
      description: 'Add parentheses around multiline JSX assignments',
    },
    fixable: 'code',
    schema: [],
    messages: {
      wrap: 'Wrap multiline JSX expressions in parentheses.',
    },
  },

  create(context) {
    const sourceCode = context.sourceCode

    function checkJsx(node) {
      const text = sourceCode.getText(node)

      // On intervient uniquement sur du JSX multiligne
      if (!text.includes('\n')) return

      // Évite de rajouter des parenthèses si elles existent déjà
      const before = sourceCode.text
        .slice(0, node.range[0])
        .trimEnd()

      const after = sourceCode.text
        .slice(node.range[1])
        .trimStart()

      if (before.endsWith('(') && after.startsWith(')')) return

      context.report({
        node,
        messageId: 'wrap',
        fix(fixer) {
          return [
            fixer.insertTextBefore(node, '('),
            fixer.insertTextAfter(node, ')'),
          ]
        },
      })
    }

    function isJsx(node) {
      return (
        node &&
        (node.type === 'JSXElement' || node.type === 'JSXFragment')
      )
    }

    return {
      AssignmentExpression(node) {
        if (isJsx(node.right)) {
          checkJsx(node.right)
        }
      },

      VariableDeclarator(node) {
        if (isJsx(node.init)) {
          checkJsx(node.init)
        }
      },
    }
  },
}