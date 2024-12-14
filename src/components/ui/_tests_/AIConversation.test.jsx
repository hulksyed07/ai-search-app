import React from 'react';
import AIConversation from "../AIConversation.jsx";
import {render} from "@testing-library/react";

describe("AIConversation", () => {
    it("renders correctly", () => {
        const { container } = render(<AIConversation />);
        expect(container).toMatchSnapshot();
    });
});
