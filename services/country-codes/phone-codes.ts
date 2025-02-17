import axios from "axios";

export const getCountriesPhoneCodes = async () => {
  try {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=flag,idd,name"
    );

    const codes = response.data.map(
      (code: {flag: any; idd: {suffixes: any[]; root: any}; name: any}) => {
        return {
          flag: code.flag,
          idd:
            code.name.common !== "United States"
              ? code.idd.suffixes.map((suffix: any) => {
                  return code.idd.root + suffix;
                })
              : [code.idd.root],
        };
      }
    );

    return codes;
  } catch (error) {
    console.log(error);
  }
};