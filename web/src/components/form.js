import {parseLocaleDate, parseLocaleDatetime, parseRawText, parseValue} from "../utils";

export default {
  methods: {
    updateTradePSB(typeCode, raw) {
      try {
        const list = parseRawText(raw);
        console.log('updateTradePSB', list);
        const isDividend = typeCode === 'dividend';
        const params = {
          date: isDividend ? parseLocaleDate(list[0]) : parseLocaleDatetime(list[0]),
          code: parseValue(isDividend ? list[3] : list[2]),
          count: parseValue(isDividend ? list[4] : list[7], Number),
          price: parseValue(isDividend ? list[6] : list[9], Number),
          sum: parseValue(isDividend ? list[7] : list[10], Number),
          tax: isDividend ? parseValue(list[8], Number) : null,
          commission: isDividend ? [] : [
            parseValue(list[12], Number),
            parseValue(list[13], Number),
            parseValue(list[14], Number),
            parseValue(list[16], Number),
          ]
        };
        console.log('updateTrade', params);
        this.$store.commit('updateTrade', params);
      } catch (error) {
        console.error(error);
      }
    }
  }
}