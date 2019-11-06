import * as React from "react";
import {
    PrimaryButton,
    TeamsThemeContext,
    Panel,
    PanelBody,
    PanelHeader,
    PanelFooter,
    Surface,
    getContext
} from "msteams-ui-components-react";
import TeamsBaseComponent, { ITeamsBaseComponentProps, ITeamsBaseComponentState } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";
// const volunteers = require("../volunteers");
/**
 * State for the csrDemoTabTab React component
 */
export interface ICsrDemoTabState extends ITeamsBaseComponentState {
    entityId?: string;
    name: string;
    timevoulunteered: string;
    eventattended: string;
}

/**
 * Properties for the csrDemoTabTab React component
 */
export interface ICsrDemoTabProps extends ITeamsBaseComponentProps {

}

/**
 * Implementation of the CSRDemo Tab content page
 */
export class CsrDemoTab extends TeamsBaseComponent<ICsrDemoTabProps, ICsrDemoTabState> {

    private volunteer: any;
    // public constructor(props: ICsrDemoTabProps, setState: ICsrDemoTabState) {
    //     super(props, setState);
    //     try {
    //         // //console.log("fs.existsSync('volunteers.json')", fs.existsSync("volunteers.json"));
    //         // this.volunteer = new JsonDB("volunteers.json", true, false);
    //         // console.log("this.volunteer - ", this.volunteer);
    //         //this.volunteer = volunteers; // this.Volunteer();
    //         this.volunteer = {};
    //         this.Volunteer();
    //     } catch (exp) {
    //         console.log("expr - ", exp);
    //     }
    // }

    public onLoad(e): any {
        try {
            console.log("REceived data from server :", e.target.responseText);
            const dashboardJson = JSON.parse(e.target.responseText)["dashboard"];
            // const dataDashboard = React.createContext<ICsrState>({});
            this.setState({
                name: dashboardJson["name"],
                timevoulunteered: dashboardJson["timevoulunteered"],
                eventattended: dashboardJson["eventattended"]
            }, () => {
                console.log("Updated in state :", this.state);
            });
        } catch (exp) {
            console.log("Exp - ", exp, this.state);
        }
    }

    public componentWillMount() {
        this.updateTheme(this.getQueryVariable("theme"));
        this.setState({
            fontSize: this.pageFontSize()
        });

        // fetch("https://csrservice.azurewebsites.net/api/GetVolunteerDetails?code=id")
        //   .then(res => res.json())
        //   .then(
        //     (result) => {
        //         this.setState({data: result});
        //       console.log("Result -", result);
        //     },
        //     // Note: it's important to handle errors here
        //     // instead of a catch() block so that we don't swallow
        //     // exceptions from actual bugs in components.
        //     (error) => {
        //         console.log("error -", error);
        //     }
        //   );

        if (this.inTeams()) {
            microsoftTeams.initialize();
            microsoftTeams.registerOnThemeChangeHandler(this.updateTheme);
            microsoftTeams.getContext((context) => {
                this.setState({
                    entityId: context.entityId
                });
            });
        } else {
            this.setState({
                entityId: "This is not hosted in Microsoft Teams"
            });
        }
        this.Volunteer();
    }
    /**
     * The render() method to create the UI of the tab
     */
    public render() {
        // this.Volunteer();
        console.log("REceived data from server :", this.state);
        const context = getContext({
            baseFontSize: this.state.fontSize,
            style: this.state.theme
        });
        const { rem, font } = context;
        const { sizes, weights } = font;
        const styles = {
            header: { ...sizes.title, ...weights.semibold },
            section: { ...sizes.base, marginTop: rem(1.4), marginBottom: rem(1.4) },
            footer: { ...sizes.xsmall }
        };
        return (
            <TeamsThemeContext.Provider value={context}>
                <Surface>
                    <Panel>
                        <PanelHeader>
                            <div style={styles.header}>CSR App</div>
                        </PanelHeader>
                        <PanelBody>
                            <div style={styles.section}>
                                {this.state.entityId}
                            </div>
                            <div>
                                <table>
                                    <tr>
                                        <th>
                                            Welcome {this.state.name}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            Time Volunteered
                                    </th>
                                        <th>
                                            {this.state.timevoulunteered}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            Event Attended
                                    </th>
                                        <th>
                                            {this.state.eventattended}
                                        </th>
                                    </tr>
                                </table>
                            </div>
                            <div style={styles.section}>
                                <PrimaryButton onClick={() => alert("It worked!")}>A sample button</PrimaryButton>
                            </div>
                        </PanelBody>
                        <PanelFooter>
                            <div style={styles.footer}>
                                (C) Copyright Avanade
                            </div>
                        </PanelFooter>
                    </Panel>
                </Surface>
            </TeamsThemeContext.Provider>
        );
    }

    private Volunteer(): any {
        const request = new XMLHttpRequest();
        const param = { name: "Azure" };
        request.onloadend = this.onLoad.bind(this);
        request.open("POST", "https://csrservice.azurewebsites.net/api/GetVolunteerDetails?code=A2kiHhZ3hHR5e7vCAYovwZM3jjub0ktxuAerYzfHXHjq5Qy2d0wbqA==", true);  // `false` makes the request synchronous
        request.send(JSON.stringify(param));
        // if (request.status === 200) {
        //     console.log(request.responseText);
        // }
    }
}
