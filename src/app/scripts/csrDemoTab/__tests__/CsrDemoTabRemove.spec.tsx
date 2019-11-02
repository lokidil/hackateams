import * as React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { CsrDemoTabRemove } from "../CsrDemoTabRemove";

describe("CsrDemoTabRemove Component", () => {
    // Snapshot Test Sample
    it("should match the snapshot", () => {
        const wrapper = shallow(<CsrDemoTabRemove />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    // Component Test Sample
    it("should render the tab", () => {
        const component = shallow(<CsrDemoTabRemove />);
        const divResult = component.containsMatchingElement(<div>You"re about to remove your tab...</div>);

        expect(divResult).toBeTruthy();
    });
});
