import React from 'react';
import { render, screen } from "@testing-library/react";
import App from "../../App";

describe("App Component", () => {
    test("renders the app component", () => {
        render(<App />);
        const linkElement = screen.getByText(/OpenAI-Powered Search/i);
        expect(linkElement).toBeInTheDocument();
    });
});
