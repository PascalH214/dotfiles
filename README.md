# Dotfiles Management with Chezmoi

A comprehensive dotfiles repository managed with [Chezmoi](https://www.chezmoi.io/), automating system configuration across multiple distributions (Arch Linux, Ubuntu) and platforms.

## Overview

This project uses Chezmoi to manage dotfiles and system configurations with support for:

- Template-based configuration files
- OS and environment-specific configurations
- Automated package installation
- System service configuration
- Neovim, Tmux, Kitty, and other development tools setup
- Desktop environment configuration (Hyprland)

## Features

- **Multi-OS Support**: Arch Linux and Ubuntu specific package management
- **Automated Setup**: Run scripts execute on changes via Chezmoi hooks
- **Templated Configs**: Configuration files support templating for dynamic values
- **Ansible Integration**: System-level configuration via Ansible playbooks
- **Development Tools**: Pre-configured Neovim, Tmux, and other utilities
- **Wireless Configuration**: iwd daemon configuration for network management
- **Desktop Environment**: Hyprland window manager with complete setup

## Prerequisites

- Git
- Chezmoi
- Ansible (for system configuration tasks)
- For Arch Linux: `yay` (for AUR packages)
- For package installations: `pacman` (Arch) or `apt` (Ubuntu)

## Installation

1. Install Chezmoi:

```bash
sh -c "$(curl -fsLS get.chezmoi.io)"
```

1. Initialize your dotfiles:

```bash
chezmoi init --apply https://github.com/username/dotfiles
```

Or if you already have a local copy:

```bash
chezmoi init --apply --source /path/to/dotfiles
```

1. Apply the configuration:

```bash
chezmoi apply
```

## Project Structure

```plaintext
.
├── ansible_playbooks/          # Ansible playbooks for system configuration
│   ├── ansible_timezone.yml     # Timezone configuration
│   └── ansible_iwd.yml          # iwd daemon configuration
├── dot_config/                  # Application configurations
│   ├── hypr/                    # Hyprland window manager
│   ├── nvim/                    # Neovim editor configuration
│   ├── kitty/                   # Kitty terminal emulator
│   ├── tmux/                    # Tmux terminal multiplexer
│   ├── rofi/                    # Application launcher
│   ├── waybar/                  # Status bar
│   ├── yazi/                    # File manager
│   ├── fastfetch/               # System information display
│   └── other/                   # Additional configurations
├── dot_wallpaper/               # Wallpaper files
├── dot_bash*                    # Bash configuration files
├── dot_gitconfig.tmpl           # Git configuration template
├── run_onchange_*.sh.tmpl       # Automated setup scripts
└── ansible_iwd.yml              # Ansible playbook

```

## Automated Setup Scripts

Setup scripts run automatically when their source files change:

- `run_onchange_00_print_info.sh.tmpl` - Display system information
- `run_onchange_05_install_yay.sh.tmpl` - Install yay package manager (Arch)
- `run_onchange_10_install_packages_arch.sh.tmpl` - Install Arch packages
- `run_onchange_10_install_packages_ubuntu.sh.tmpl` - Install Ubuntu packages
- `run_onchange_15_install_packages_npm.sh.tmpl` - Install NPM packages
- `run_onchange_20_bitwarden.sh.tmpl` - Bitwarden CLI setup
- `run_onchange_25_configure_ansible.sh.tmpl` - Run all Ansible playbooks
- `run_onchange_30_code_extensions.sh.tmpl` - Install VS Code extensions

## Configuration Files

### Shell Configuration

- `.bashrc` - Main bash configuration
- `.bash_aliases` - Command aliases
- `.bash_exports` - Environment variables
- `.bash_profile` - Login shell configuration
- `.bash_ssh` - SSH configuration

### Development Tools

- **Neovim** (`dot_config/nvim/`)
  - LSP configuration with Mason
  - Plugin management with Lazy
  - Language support and formatting
  
- **Tmux** (`dot_config/tmux/`)
  - Keybindings and layout configuration
  - Terminal multiplexing setup

- **Kitty** (`dot_config/kitty/`)
  - Terminal emulator configuration
  - Theme management

### Desktop Environment

- **Hyprland** (`dot_config/hypr/`)
  - Window manager configuration
  - Keybindings for applications, layout, multimedia, tools, and workspace management
  - Animation and styling configuration
  - Input and environment variables

### System Tools

- **Rofi** (`dot_config/rofi/`)
  - Application launcher with themes
  - Bluetooth, WiFi, and power menus

- **Waybar** (`dot_config/waybar/`)
  - Status bar configuration
  - System information display

- **Yazi** (`dot_config/yazi/`)
  - Terminal file manager configuration
  - Custom plugins

## Usage

### Apply Configuration

```bash
chezmoi apply
```

### Check Changes

```bash
chezmoi diff
```

### Update Your Dotfiles

Edit files in the chezmoi source directory and apply:

```bash
chezmoi apply
```

### Add New Files

```bash
chezmoi add ~/.config/some_app/config.toml
```

### Update from Repository

```bash
chezmoi update
```

## System Configuration

### Timezone

Timezone is set to Europe/Berlin via Ansible. To change:
Edit `ansible_playbooks/ansible_timezone.yml` and modify the timezone name.

### Wireless Configuration

iwd daemon configuration is managed via `ansible_playbooks/ansible_iwd.yml`.
Ensure iwd is installed and enabled:

```bash
sudo systemctl enable --now iwd
```

## Customization

Configuration templates support conditional statements using Go templating:

```bash
{{ if eq .os "arch-linux" }}
# Arch-specific configuration
{{ end }}
```

Available template variables come from `.chezmoi.toml.tmpl` (not included in this repo for privacy).

## Templated Files

Files ending with `.tmpl` are processed as templates:

- `.bashrc.tmpl` - Bash configuration with variables
- `.bash_exports.tmpl` - Environment variables with templating
- `.gitconfig.tmpl` - Git configuration with user-specific values
- `config.jsonc.tmpl` - Application configs with templating

## Notes

- Password entries are requested once when running Ansible playbooks
- Scripts use color-coded output for better readability
- Error handling ensures failures are reported clearly
- Multiple configuration profiles can be maintained with conditional logic

## License

Personal dotfiles repository. Use as reference or adapt for your needs.

## Resources

- [Chezmoi Documentation](https://www.chezmoi.io/)
- [Ansible Documentation](https://docs.ansible.com/)
- [Hyprland Wiki](https://wiki.hyprland.org/)
- [Neovim Documentation](https://neovim.io/)
