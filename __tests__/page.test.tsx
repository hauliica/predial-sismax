/**
 * @jest-environment jsdom
 */

import {render, screen} from "@testing-library/react";
import Hero from "../components/sections/Hero";


describe("Home", () => {
    it("renders a heading", () => {
        render(<Hero/>)

        const heading = screen.getByRole("heading", {level: 1});

        expect(heading).toBeInTheDocument();
    });
});

