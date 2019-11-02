import * as React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { AboutCsrDemoBoTab } from "../AboutCsrDemoBoTab";

describe("AboutCsrDemoBo Component", () => {
    // Snapshot Test Sample
    it("should match the snapshot", () => {
        const wrapper = shallow(<AboutCsrDemoBoTab />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    // Component Test Sample
    it("should render the tab", () => {
        const component = shallow(<AboutCsrDemoBoTab />);
        const divResult = component.containsMatchingElement(<div>Welcome to the CSRDemo Bot bot page</div>);

        expect(divResult).toBeTruthy();
    });
});
