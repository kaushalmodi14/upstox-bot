//
// Option Chain Utility Functions (Refactored)
//


export const getDateParts = (timezone = "Asia/Kolkata") => {
    const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: timezone })
    );

    return {
        time: now.toTimeString().split(" ")[0],     // HH:MM:SS
        day: now.getDate(),                         // 1–31
        month: now.getMonth() + 1,                  // 1–12
        year: now.getFullYear(),
        dateString: now.toISOString().split('T')[0] // YYYY-MM-DD
    };
}

/**
 * Finds the ATM strike and its index based on closest strike to spot price.
 */
export const getATMPriceData = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
        return { atm: null, index: -1 };
    }

    const spotPrice = data[0].underlying_spot_price;

    let closestDiff = Infinity;
    let atmStrike = null;
    let atmIndex = -1;

    data.forEach((item, i) => {
        const diff = Math.abs(spotPrice - item.strike_price);
        if (diff < closestDiff) {
            closestDiff = diff;
            atmStrike = item.strike_price;
            atmIndex = i;
        }
    });

    return { atm: atmStrike, index: atmIndex };
};

/**
 * Returns a window of 5 options centered around the ATM strike.
 * Safe at edges (beginning/end of list).
 */
export const getFinalData = (data) => {
    const { index } = getATMPriceData(data);
    if (index === -1) return [];

    const start = Math.max(index - 2, 0);
    const end = Math.min(index + 3, data.length);

    let toPrepareData = data.slice(start, end);
    let convertedData = toPrepareData.map(item => convertOption(item));
    convertedData.map(item => convertOption(item));

    return convertedData;
};

/**
 * Converts the raw option object into a normalized format.
 * Includes greeks for both call & put using common structure.
 */
export const convertOption = (data) => {
    if (!data) return null;

    const greeks = data.call_options?.option_greeks || {};

    return {
        time: getDateParts().time,
        pcr: data.pcr,
        strike_price: data.strike_price,
        spot_price: data.underlying_spot_price,
        call_options: {
            option_greeks: { ...greeks }
        },
        put_options: {
            option_greeks: { ...greeks }
        }
    };
};

export const getCombinedData = (data) => {
    const finalData = getFinalData(data);
    let combinedData = {
        time: getDateParts().time,
    };
    const atm = finalData[2];
    const minus1 = finalData[1];
    const minus2 = finalData[0];
    const plus2 = finalData[4];
    const plus1 = finalData[3];

    combinedData = {
        'TIME': combinedData.time,
        spot: atm.underlying_spot_price,
        india_vix: data.india_vix || null,
        atm_strike: atm.strike_price,
        atm_iv: null,

        atm_ce_prev_close: null,
        atm_ce_premium: null,
        atm_ce_iv: atm.call_options.option_greeks.iv,
        atm_ce_delta: atm.call_options.option_greeks.delta,
        atm_ce_gamma: atm.call_options.option_greeks.gamma,
        atm_ce_theta: atm.call_options.option_greeks.theta,
        atm_ce_oi: null,
        atm_ce_oi_change: null,

        atm_pe_prev_close: null,
        atm_pe_premium: null,
        atm_pe_iv: atm.put_options.option_greeks.iv,
        atm_pe_delta: atm.put_options.option_greeks.delta,
        atm_pe_gamma: atm.put_options.option_greeks.gamma,
        atm_pe_theta: atm.put_options.option_greeks.theta,
        atm_pe_oi: null,
        atm_pe_oi_change: null,

        plus1_strike: plus1.strike_price,
        plus1_ce_iv: plus1.call_options.option_greeks.iv,
        plus1_pe_iv: plus1.put_options.option_greeks.iv,
        plus1_ce_delta: plus1.call_options.option_greeks.delta,
        plus1_pe_delta: plus1.put_options.option_greeks.delta,
        plus1_ce_theta: plus1.call_options.option_greeks.theta,
        plus1_pe_theta: plus1.put_options.option_greeks.theta,
        plus1_ce_gamma: plus1.call_options.option_greeks.gamma,
        plus1_pe_gamma: plus1.put_options.option_greeks.gamma,
        plus1_ce_oi: null,
        plus1_pe_oi: null,
        plus1_ce_oi_change: null,
        plus1_pe_oi_change: null,

        minus1_strike: minus1.strike_price,
        minus1_ce_iv: minus1.call_options.option_greeks.iv,
        minus1_pe_iv: minus1.put_options.option_greeks.iv,
        minus1_ce_delta: minus1.call_options.option_greeks.delta,
        minus1_pe_delta: minus1.put_options.option_greeks.delta,
        minus1_ce_theta: minus1.call_options.option_greeks.theta,   
        minus1_pe_theta: minus1.put_options.option_greeks.theta,
        minus1_ce_gamma: minus1.call_options.option_greeks.gamma,
        minus1_pe_gamma: minus1.put_options.option_greeks.gamma,
        minus1_ce_oi: null,
        minus1_pe_oi: null,
        minus1_ce_oi_change: null,
        minus1_pe_oi_change: null,

        plus2_strike: plus2.strike_price,
        plus2_ce_iv: plus2.call_options.option_greeks.iv,
        plus2_pe_iv: plus2.put_options.option_greeks.iv,
        plus2_ce_delta: plus2.call_options.option_greeks.delta,
        plus2_pe_delta: plus2.put_options.option_greeks.delta,
        plus2_ce_theta: plus2.call_options.option_greeks.theta,
        plus2_pe_theta: plus2.put_options.option_greeks.theta,
        plus2_ce_gamma: plus2.call_options.option_greeks.gamma,
        plus2_pe_gamma: plus2.put_options.option_greeks.gamma,
        plus2_ce_oi: null,
        plus2_pe_oi: null,
        plus2_ce_oi_change: null,
        plus2_pe_oi_change: null,

        minus2_strike: minus2.strike_price,
        minus2_ce_iv: minus2.call_options.option_greeks.iv,
        minus2_pe_iv: minus2.put_options.option_greeks.iv,
        minus2_ce_delta: minus2.call_options.option_greeks.delta,
        minus2_pe_delta: minus2.put_options.option_greeks.delta,
        minus2_ce_theta: minus2.call_options.option_greeks.theta,
        minus2_pe_theta: minus2.put_options.option_greeks.theta,
        minus2_ce_gamma: minus2.call_options.option_greeks.gamma,
        minus2_pe_gamma: minus2.put_options.option_greeks.gamma,
        minus2_ce_oi: null,
        minus2_pe_oi: null,
        minus2_ce_oi_change: null,
        minus2_pe_oi_change: null,

    }
    return combinedData;
}
