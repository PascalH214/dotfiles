# Dotfiles Management with Chezmoi

A comprehensive dotfiles repository managed with [Chezmoi](https://www.chezmoi.io/), automating system configuration across multiple distributions (Arch Linux, Debian) and platforms.

## Overview

This project uses Chezmoi to manage dotfiles and system configurations with support for:

- Template-based configuration files
- OS and environment-specific configurations
- Automated package installation
- System service configuration
- Neovim, Tmux, Kitty, and other development tools setup
- Desktop environment configuration (Hyprland)

## Features

- **Multi-OS Support**: Arch Linux and Debian specific package management
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
- For package installations: `pacman` (Arch) or `apt` (Debian)

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

The setup will prompt you to customize several options:

- **OS**: Arch Linux or Ubuntu
- **Headless**: Whether your system has a GUI
- **Desktop Environment**: Hyprland setup (GUI systems)
- **Display Manager**: ly display manager (GUI systems)
- **Packaging**: KDE apps, Media tools, Timeshift
- **GPU Vendor**: AMD, NVIDIA, Intel, or None
- **Optional Packages**:
  - GUI Applications (VS Code, Chrome, Firefox, etc.)
  - Development Tools (Docker, Maven, Terraform, Ansible)
  - TUI Applications (Neovim, Tmux, Yazi, etc.)
  - Font packages
  - Printers & Scanners (CUPS, SANE)
- **Gaming**: Gaming tools and kernel optimizations (optional)

1. Apply the configuration:

```bash
chezmoi apply
```

## Project Structure

```plaintext
.
├── lib/                         # Shared libraries and utilities
│   └── common.sh.tmpl           # Common functions for all scripts
├── ansible_playbooks/           # Ansible playbooks for system configuration
│   ├── grub_windows.yml         # GRUB Windows entry configuration
│   ├── iwd.yml                  # iwd wireless daemon configuration
│   ├── ly_config.yml            # ly display manager configuration
│   ├── multilib.yml             # Multilib repository enablement
│   ├── power_management.yml     # Suspend/hibernate configuration
│   └── timezone.yml             # Timezone configuration
├── dot_config/                  # Application configurations
│   ├── hypr/                    # Hyprland window manager
│   ├── nvim/                    # Neovim editor configuration
│   ├── kitty/                   # Kitty terminal emulator
│   ├── tmux/                    # Tmux terminal multiplexer
│   ├── rofi/                    # Application launcher
│   ├── waybar/                  # Status bar
│   ├── yazi/                    # Terminal file manager
│   ├── fastfetch/               # System information display
│   ├── lsd/                     # lsd ls replacement
│   └── other/                   # Additional configurations
├── dot_wallpaper/               # Wallpaper files
├── dot_bash*                    # Bash configuration files
├── dot_gitconfig.tmpl           # Git configuration template
├── run_onchange_*.sh.tmpl       # Automated setup scripts
└── run_25_configure_ansible.sh.tmpl # Ansible playbooks runner

```

## Automated Setup Scripts

Setup scripts run automatically when their source files change. All scripts source the shared library (`lib/common.sh.tmpl`) for common functions.

### Initialization

- `run_onchange_00_print_info.sh.tmpl` - Display system information and confirm setup
- `run_onchange_05_install_yay.sh.tmpl` - Install yay package manager (Arch only)

### Modular Package Installation (run_onchange_10_*)

Scripts are modular to enable independent feature management:

**Base Packages** (always run):

- `run_onchange_10_install_base_packages_arch.sh.tmpl` - CLI, TUI, Dev, GUI tools (Arch)
- `run_onchange_10_install_base_packages_debian.sh.tmpl` - CLI, TUI, Dev, GUI tools (Debian)

**Optional Packages** (conditional on `.chezmoi.toml` flags):

- `run_onchange_10_install_hyprland_arch.sh.tmpl` - Hyprland WM packages (.install_hyprland)
- `run_onchange_10_install_hyprland_debian.sh.tmpl` - Hyprland WM packages (.install_hyprland)
- `run_onchange_10_install_kde_arch.sh.tmpl` - KDE applications (.install_kde_apps)
- `run_onchange_10_install_kde_debian.sh.tmpl` - KDE applications (.install_kde_apps)
- `run_onchange_10_install_media_arch.sh.tmpl` - Media tools (.install_media_related_pkgs)
- `run_onchange_10_install_media_debian.sh.tmpl` - Media tools (.install_media_related_pkgs)
- `run_onchange_10_install_timeshift_arch.sh.tmpl` - Timeshift backup (.install_timeshift)
- `run_onchange_10_install_timeshift_debian.sh.tmpl` - Timeshift backup (.install_timeshift)
- `run_onchange_10_install_virtualbox_arch.sh.tmpl` - VirtualBox packages (.install_virtualbox)
- `run_onchange_10_install_gaming_arch.sh.tmpl` - Gaming tools and optimizations (.install_gaming)

### Additional Setup

- `run_onchange_15_install_packages_npm.sh.tmpl` - Install NPM packages globally
- `run_onchange_20_bitwarden.sh.tmpl` - Bitwarden CLI setup for SSH keys
- `run_onchange_22_install_gpu_drivers.sh.tmpl` - GPU drivers (AMD, NVIDIA, Intel)
- `run_onchange_25_configure_system.sh.tmpl` - System configuration (Docker, Bluetooth, SSH, etc.)
- `run_onchange_25_configure_ansible.sh.tmpl` - Run Ansible playbooks
- `run_onchange_27_install_printers_scanners.sh.tmpl` - CUPS and SANE installation
- `run_onchange_28_configure_printers_scanners.sh.tmpl` - Printers and scanners service setup
- `run_onchange_30_code_extensions.sh.tmpl` - Install VS Code extensions
- `run_onchange_35_configure_virtualbox.sh.tmpl` - VirtualBox kernel modules and group setup

## Shared Library

The `lib/common.sh.tmpl` file contains reusable functions used by all setup scripts:

**Output Functions**:

- `print_section(label)` - Print formatted section headers
- `print_success(message)` - Print success messages with checkmark
- `print_info(message)` - Print information messages
- `print_warning(message)` - Print warning messages
- `print_error(message)` - Print error messages to stderr

**Package Installation**:

- `install_yay_packages(label, packages...)` - Install packages via yay (Arch)
- `install_apt_packages(label, packages...)` - Install packages via apt (Debian)
- `install_npm_packages(label, packages...)` - Install global NPM packages

**System Utilities**:

- `add_user_to_group(username, groupname)` - Safely add user to group
- `command_exists(command)` - Check if command is available
- `enable_service(service, [user_service])` - Enable and start systemd services
- `confirm(prompt)` - Prompt user for yes/no confirmation
- `require_command(cmd, [install_msg])` - Require command or fail
- `mkdir_safe(path)` - Create directory recursively
- `die(message)` - Exit with error message

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

### GPU Drivers

GPU driver installation is configured via the `gpu_vendor` setting during chezmoi initialization:

- **AMD (AMDGPU)**: Installs amdgpu-dkms, Vulkan, Mesa, ROCm, and radeontop monitoring tool
- **NVIDIA**: Installs nvidia drivers, cuda, and cudnn
- **Intel**: Installs Intel media driver, Vulkan, and Mesa
- **None**: Skip GPU driver installation

The script is run automatically during `chezmoi apply` if a GPU vendor is selected.

### Gaming Setup

Optional gaming configuration includes:

- **Game Launchers**: Steam, Lutris, Heroic Games Launcher, Bottles
- **Compatibility Tools**: Wine, Proton (GE-Custom), DXVK, VKD3D
- **Performance Tools**: GameMode, Gamescope, MangoHUD, Goverlay
- **Monitoring**: CPU-X, GPU monitoring tools, FPS overlay
- **Peripherals**: Piper (mouse), Solaar (Logitech), OpenRGB (LED control)
- **Kernel Optimizations**: Tuned parameters for reduced latency and jitter
- **Helper Scripts**: Gaming environment setup with pre-configured settings

Enabled via the `install_gaming` flag during chezmoi initialization.

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
