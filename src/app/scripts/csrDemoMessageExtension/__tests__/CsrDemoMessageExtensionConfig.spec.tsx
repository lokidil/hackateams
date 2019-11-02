import * as React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { CsrDemoMessageExtensionConfig } from "../CsrDemoMessageExtensionConfig";

describe("CsrDemoMessageExtensionConfig Component", () => {
    // Snapshot Test Sample
    it("should match the snapshot", () => {
        const wrapper = shallow(<CsrDemoMessageExtensionConfig />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    // Component Test Sample
    it("should render the tab", () => {
        const component = shallow(<CsrDemoMessageExtensionConfig />);
        const divResult = component.containsMatchingElement(<div>CSRDemo Message Extension configuration</div>);

        expect(divResult).toBeTruthy();
    });
});


