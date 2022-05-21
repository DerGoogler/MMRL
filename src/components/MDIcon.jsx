import * as React from "react";

class MDIcon extends React.Component {
    stringToBoolean(string) {
        if (typeof string == "boolean") return string;
        switch (string) {
            case "true":
            case "yes":
            case "1":
                return true;

            case "false":
            case "no":
            case "0":
            case null:
                return false;

            default:
                return Boolean(string);
        }
    }

    typeIF(_, __, ___) {
        if (this.stringToBoolean(_)) {
            return __;
        } else {
            return ___;
        }
    }

    typeCheck(_, __) {
        if (_ === undefined || _ === null || _ === "" || __ === 0 || _ === "0" || _ === false || _ === "false") {
            return __;
        } else {
            return _;
        }
    }

    render() {
        const { icon, size, disabled, isInList, isInToolbar, theme, style } = this.props;
        return (
            <span>
                <span
                    className={
                        "material-icons-round " +
                        this.typeIF(isInList, "list-item__icon", "") +
                        " ons-icon " +
                        "material-icons md-" +
                        size +
                        " md-" + theme +
                        " " +
                        this.typeIF(disabled, "md-inactive ", "")
                    }
                    style={{
                        textAlign: "center",
                        height: this.typeIF(isInToolbar, "56px", "100%"),
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        ...style
                    }}
                >
                    {icon}
                </span>
            </span>
        );
    }
}

export default MDIcon;