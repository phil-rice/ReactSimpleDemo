//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {enzymeSetup} from '../../enzymeAdapterSetup';
import {mount, shallow} from "enzyme";
import React from "react";
import {sampleStatement} from "./sampleStatement";
import {StatementPage2x2} from "./statementPage2x2";
import {lensState} from "@focuson/state";
import {StateForStatement2x2Test, StateForStatementTest} from "./statement.pact.spec";
import {Statement} from "./statement.domain";


enzymeSetup()

const statementState = (statement2x2?: Statement) => lensState<StateForStatement2x2Test>({statement2x2, tags: {}, pageSelection: {pageName: 'statement'}}, (s: StateForStatementTest) => {}, 'statementState')
    .focusOn('statement2x2')

describe("StatementPage2x2... note that they didn't need to change", () => {
    describe("when loading is false", () => {
        it("should render without throwing an exception", () => {
            const comp = mount(StatementPage2x2<StateForStatement2x2Test>()({state: statementState(sampleStatement)}))
        })

        it("should display the address in a values panel that has a 'Statement Address' title", () => {
            const comp = shallow(StatementPage2x2<StateForStatement2x2Test>()({state: statementState(sampleStatement)}))
            const values = comp.find("Values")
            expect(values.length).toBe(1)
            const values0 = values.at(0)
            let props: any = values0.props();
            expect(props["title"]).toBe("Statement Address")
            expect(props["values"]).toBe(sampleStatement.address)
            expect(props["labels"]).toEqual(["addLineOne", "addLineTwo", "addLineThree", "addLineFour", "pcd"])
        })
        it("should display the statement details in a TitleAndValues panel without a title", () => {
            const comp = shallow(StatementPage2x2<StateForStatement2x2Test>()({state: statementState(sampleStatement)}))
            const values = comp.find("TitleAndValues")
            expect(values.length).toBe(1)
            const values0 = values.at(0)
            const props: any = values0.props()
            expect(props["title"]).toBe(undefined)
            expect(props["titles"]).toBe(sampleStatement.statementTitles)
            expect(props["values"]).toBe(sampleStatement.statementValues)
            expect(props["labels"]).toEqual([['statementFrequency', 'nbtStatementFreq'],
                ['lastStatementDate', 'nbtLastStatementDate'],
                ['lastStatementNo', 'nbtLastStatementNo'],
                ['nextStatementDate', 'nbtNextStatementDate']])
        })

        it("should have a request interim payment button", () => {
            const comp = mount(StatementPage2x2<StateForStatement2x2Test>()({state: statementState(sampleStatement)}))
            const buttons = comp.find("button").find('#buttonRequestInterim')
            expect(buttons.length).toBe(1)
            const button = buttons.at(0)
            expect(button.text()).toEqual("Request Interim Payment")
        })
        it("should have a nextStatement button", () => {
            const comp = mount(StatementPage2x2<StateForStatement2x2Test>()({state: statementState(sampleStatement)}))
            const buttons = comp.find("button").find('#buttonNextStatement')
            expect(buttons.length).toBe(1)
            const button = buttons.at(0)
            expect(button.text()).toEqual("Last Statement Date:31st March 2021")
        })
    })
    describe("when loading ", () => {
        it("should display loading text only ", () => {
            const comp = mount(StatementPage2x2<StateForStatement2x2Test>()({state: statementState(undefined)}))
            expect(comp.text()).toEqual("2x2 Loading")
        })
    })
})
