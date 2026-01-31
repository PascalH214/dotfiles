# Printers and Scanners Configuration

This directory contains the configuration scripts for setting up printers (CUPS) and scanners (SANE) on Arch Linux.

## Overview

The printer and scanner setup includes:

### CUPS (Common Unix Printing System)

- **Package**: `cups`, `cups-pdf`, `cups-filters`, `ghostscript`, `gsfonts`
- **Services**: `cups.service`
- **Web Interface**: <http://localhost:631/>
- **Features**:
  - Support for USB printers
  - Network printer detection and configuration
  - PDF printing support
  - Driverless printing (AirPrint, IPP Everywhere)

### SANE (Scanner Access Now Easy)

- **Packages**: `sane`, `sane-airscan`, `ipp-usb`
- **Services**: `saned.socket`, `ipp-usb.service`
- **Features**:
  - Support for USB scanners
  - Network scanner discovery
  - Driverless scanning (AirScan)
  - IPP over USB support

### Optional Scanner Frontends (GUI)

- **simple-scan**: Simplified GTK-based scanner interface
- **skanlite**: KDE-based scanner interface

## Files

- `run_onchange_27_install_printers_scanners_arch.sh.tmpl`: Installs required packages
- `run_onchange_27_configure_printers_scanners_arch.sh.tmpl`: Configures and enables services

## Installation

The setup will be automatically triggered if you enable `install_printers_scanners` during chezmoi initialization.

To manually enable this feature, edit your `.chezmoi.toml` and set:

```toml
install_printers_scanners = true
```

Then run:

```bash
chezmoi apply
```

## Configuration

### CUPS Setup

After installation and enabling CUPS service, you can:

1. **Access the web interface**: <http://localhost:631/>
2. **Add a printer via CLI**:

   ```bash
   # For USB printers (auto-discovered)
   lpadmin -p MyPrinter -E -v "usb://HP/DESKJET%20940C" -m everywhere
   
   # For network printers
   lpadmin -p MyPrinter -E -v "ipp://192.168.1.100/ipp/print" -m everywhere
   ```

3. **List available printers**:

   ```bash
   lpstat -p -d
   ```

4. **Print a test page**:

   ```bash
   lpr /usr/share/cups/data/testprint
   ```

### SANE Setup

After installation and enabling saned service, you can:

1. **List connected scanners**:

   ```bash
   scanimage -L
   ```

2. **Perform a test scan**:

   ```bash
   scanimage --format=png --output-file test.png
   ```

3. **Use a scanner GUI** (if installed):
   - **simple-scan**: `simple-scan`
   - **skanlite**: `skanlite`

4. **Share scanner over network** (optional):
   Edit `/etc/sane.d/saned.conf`:

   ```conf
   localhost
   192.168.0.0/24
   ```

   Then enable `saned.socket`:

   ```bash
   sudo systemctl enable --now saned.socket
   ```

## Permissions

The installation script will automatically add your user to the `lp` group, which is required for:

- Managing printers in CUPS
- Accessing scanners via SANE

After group assignment, you may need to log out and log back in for the changes to take effect.

## Common Issues

### Scanner Not Detected

1. Check if the scanner is listed:

   ```bash
   scanimage -L
   ```

2. If not found, check USB connection:

   ```bash
   lsusb
   ```

3. If it's an HP device, you may need to install additional drivers:

   ```bash
   yay -S hplip hplip-plugin
   ```

### CUPS Printer Not Found

1. Check if CUPS service is running:

   ```bash
   sudo systemctl status cups.service
   ```

2. List available printers:

   ```bash
   lpinfo -v
   ```

3. For network printers, ensure Avahi is running (for DNS-SD discovery):

   ```bash
   sudo systemctl enable --now avahi-daemon.service
   ```

### Permission Denied

1. Verify user is in `lp` group:

   ```bash
   groups $USER
   ```

2. If not, add user to group:

   ```bash
   sudo usermod -aG lp $USER
   ```

3. Log out and log back in for changes to take effect.

## Useful Commands

### CUPS

```bash
# Enable/disable a printer
cupsenable printer_name
cupsdisable printer_name

# Check print queue
lpq

# Remove print jobs
lprm -

# Check default printer
lpstat -d

# Set default printer
lpoptions -d printer_name

# View printer status
lpstat -t
```

### SANE

```bash
# List all scanner options
scanimage -A

# Scan to PDF with OCR (if configured)
scanimage -p | convert - output.pdf

# Scan with specific device
scanimage --device "device_name" -o output.png

# Test scanner connection
scanimage -T
```

## References

- [CUPS - ArchWiki](https://wiki.archlinux.org/title/CUPS)
- [CUPS Troubleshooting - ArchWiki](https://wiki.archlinux.org/title/CUPS/Troubleshooting)
- [SANE - ArchWiki](https://wiki.archlinux.org/title/SANE)
- [SANE Scanner-specific problems - ArchWiki](https://wiki.archlinux.org/title/SANE/Scanner-specific_problems)
- [CUPS Documentation](http://localhost:631/help)

## Additional Resources

### GUI Tools

- **system-config-printer**: Graphical printer configuration (already installed in non-headless setups)
- **simple-scan**: Simple document scanner interface
- **skanlite**: KDE document scanner interface

### Optional Packages

- **hplip**: HP printer and scanner support
- **iscan**: Epson scanner support
- **brscan**: Brother scanner support
- **sane-airscan**: Driverless scanning (AirScan protocol)

For specific printer/scanner model support, check the [OpenPrinting Printer List](https://www.openprinting.org/printers) and [SANE Supported Devices](http://www.sane-project.org/sane-supported-devices.html).
