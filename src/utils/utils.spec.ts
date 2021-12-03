//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {enzymeSetup} from '../enzymeAdapterSetup';
import {or, stringFrom} from "./utils";

enzymeSetup()

const values = {
    value1: "ValueOne",
    value2: "ValueTwo",
}
describe("utils", () => {
    describe("stringFrom", () => {
        it("should get values if they are there", () => {
            expect(stringFrom(values, 'value1')).toEqual('ValueOne')
            expect(stringFrom(values, 'value2')).toEqual('ValueTwo')
        })

        it("should return undefined if they are not there", () => {
            // @ts-ignore Note the power of typescript that it's actually a compilation to do this...
            expect(stringFrom(values, 'value3')).toEqual(undefined)

        })
        it("should return undefined if the values are undefined", () => {
            // @ts-ignore Note the power of typescript that it's actually a compilation to do this...
            expect(stringFrom(undefined, 'value3')).toEqual(undefined)

        })
        // it("should write to console.error in the event of a failure", () => {
        //     //but I don't know how to write this
        // })
    })

    describe("or", () => {
        it("should return the value or the default value if the value is undefined", () => {
            expect(or(() =>"def")("1")).toEqual("1")
            expect(or(() =>"def")(undefined)).toEqual("def")

        })
    })
})
