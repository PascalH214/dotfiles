return {
  'WhoIsSethDaniel/mason-tool-installer.nvim',
  config = function()
    require("mason-tool-installer").setup({
      ensure_installed = {
        "ansible-lint",
        "markdownlint",
        "eslint_d",
        "tflint",
        "ast_grep"
      },
      auto_update = true,
    })
  end,
}
