import { round } from "./numericHelper";

let float = 7.1923
test(`Testing rounding {float} to 2 decimal places`, () => {
    expect(round(float, 2)).toBe(7.19)
})