import * as React from "react";
import { Page, Toolbar, ToolbarButton, BackButton } from "react-onsenui";
import MDIcon from "../components/MDIcon";
import axios from "axios";
import Markdown from 'markdown-to-jsx';

class ViewModuleActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: ""
        }
    }

    componentDidMount = () => {
        axios.get(this.props.extra.notes)
            .then((response) => {
                this.setState({
                    notes: response.data,
                })
            })
            .catch((error) => {
                this.setState({
                    notes: error.toString(),
                })
            })
            .then(() => {
                // always executed
            });
    }

    renderToolbar = () => {
        return (
            <Toolbar>
                <div className="left">
                    <BackButton
                        // @ts-ignore
                        onClick={() => { this.props.popPage() }}
                    />
                </div>
                <div className='center'>{this.props.extra.name}</div>
                <div className='right'>
                    <ToolbarButton style={{ padding: "0px 10px" }} onClick={() => {
                        window.open(this.props.extra.download, "_parent")
                    }}>
                        <MDIcon icon="file_download" isInToolbar={true} theme="white" size="24" />
                    </ToolbarButton>
                </div>
            </Toolbar>
        );
    }

    render = () => {
        return (
            <Page renderToolbar={this.renderToolbar}>
                <div style={{ height: "calc(100vh - 72px)", padding: "8px" }} className="markdown-body-light">
                    <Markdown>{this.state.notes}</Markdown>
                </div>
            </Page>
        );
    }
}

export default ViewModuleActivity;
