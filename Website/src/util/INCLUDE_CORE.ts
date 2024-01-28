export const INCLUDE_CORE= `GREEN="\\x1b[32m"
RED="\\x1b[31m"
CYAN="\\x1b[96m"
YELLOW="\\x1b[93m"
UNDERLINE="\\x1b[4m"
RESET="\\x1b[0m"

function ui_info { echo "$GREEN- $RESET$1"; }
function ui_error { echo "RED! $RESET$2"; exit $1; }
function ui_warn { echo "$YELLOW! $RESET$1"; }
function mmrl { echo "#!mmrl:$@"; }

echo "$GREEN    __  _____  _______  __ $RESET"
echo "$GREEN   /  |/  /  |/  / __ \\/ / $RESET"
echo "$GREEN  / /|_/ / /|_/ / /_/ / /  $RESET"
echo "$GREEN / /  / / /  / / _, _/ /___$RESET"
echo "$GREEN/_/  /_/_/  /_/_/ |_/_____/$RESET"
echo ""
ui_info "Using version $CYAN$MMRL_VER$RESET"

ui_info "Initialize BusyBox"
bb() {
   case "$ROOTMANAGER" in
      "Magisk")
        ui_info "Found$CYAN Magisk's$RESET BusyBox"
        exec $MSUBSU $@
        ;;
      "KernelSU")
        ui_info "Found$CYAN KernelSU's$RESET BusyBox"
        exec $KSUBSU $@
        ;;
      "APatchSU")
        ui_info "Found$CYAN APatch's$RESET BusyBox"
        exec $ASUBSU $@
        ;;
      "Unknown")
        ui_error 1 "Unable to find BusyBox"
        ;;
      *)
        ui_error 1 "BusyBox error"
        ;;
   esac
}

ui_info "Initialize downloader"
download_file() {
    bb wget $URL -O "$1"
    if [ $(echo $?) -eq 0 ]; then
        ui_info "Successful downloaded $GREEN$NAME$RESET"
        if [ "$CLEAR_TERMINAL_AFTER_DL" = "true" ]; then
          mmrl clearTerminal
        fi
    else
        ui_error 1 "Something went wrong"
    fi
}

ui_info "Initialize install CLI"
install_cli() {
   case "$ROOTMANAGER" in
      "Magisk")
        ui_info "Found$CYAN Magisk's$RESET CLI"
        exec $MSUCLI --install-module "$1"
        ;;
      "KernelSU")
        ui_info "Found$CYAN KernelSU's$RESET CLI"
        exec $KSUCLI module install "$1"
        ;;
      "APatchSU")
        ui_info "Found$CYAN APatch's$RESET CLI"
        exec $ASUCLI module install "$1"
        ;;
      "Unknown")
        ui_error 1 "Unable to find root manager"
        exit 1
        ;;
      *)
        ui_error 1 "Install error"
        ;;
   esac
}`