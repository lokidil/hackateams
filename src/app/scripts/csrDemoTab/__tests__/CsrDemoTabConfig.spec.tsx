import * as React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { CsrDemoTabConfig } from "../CsrDemoTabConfig";

describe("CsrDemoTabConfig Component", () => {
    // Snapshot Test Sample
    it("should match the snapshot", () => {
        const wrapper = shallow(<CsrDemoTabConfig />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    // Component Test Sample
    it("should render the tab", () => {
        const component = shallow(<CsrDemoTabConfig />);
        const divResult = component.containsMatchingElement(<div>Configure your tab</div>);

        expect(divResult).toBeTruthy();
    });
});
