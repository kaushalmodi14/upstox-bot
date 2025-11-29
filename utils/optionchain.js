

export const getATMPrice = (data) => {
let atm = 0;
let others = []
let spotPrice = data[0].underlying_spot_price;
let min = null;
for (let d of data) {
    let diff = Math.abs(spotPrice - d.strike_price);
    if (!min) {
        min = diff;
    atm = d.strike_price;

    }
    if (diff < min) {
    min = diff;
    atm = d.strike_price;
    }
    others.push(d.strike_price)
}
console.log(spotPrice)
console.log(others)
return atm;
}

export const convertOption = (data) => {
    return {
        expiry: data.expiry,
        pcr: data.pcr,
        strike_price: data.strike_price,
        spot_price: underlying_spot_price,
        call_options: {
            option_greeks: {
                theta: data.call_options.option_greeks.theta,
                gamma: data.call_options.option_greeks.gamma,
                delta: data.call_options.option_greeks.delta,
                iv: data.call_options.option_greeks.iv
            }
        },
        put_options: {
            option_greeks: {
                theta: data.call_options.option_greeks.theta,
                gamma: data.call_options.option_greeks.gamma,
                delta: data.call_options.option_greeks.delta,
                iv: data.call_options.option_greeks.iv
            }
        },
    }
}