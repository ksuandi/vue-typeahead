<template>
    <type-ahead :items="countries" :get-name="getName" :get-image="getImage" @select="onSelect"/>
</template>

<script>
import TypeAhead from "./TypeAhead.vue";
import axios from "axios";

export default {
    name: "CountrySuggest",
    components: {
        TypeAhead
    },
    props: {
        url: {
            type: String,
            required: false,
            default:
                "https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;flag"
        },
        // response field corresponding to country name
        name: {
            type: [String, Function],
            default: "name"
        },
        // response field corresponding to country flag
        flag: {
            type: [String, Function],
            default: "flag"
        }
    },
    data() {
        return {
            countries: []
        };
    },
    methods: {
        getCountryName(item) {
            if (typeof this.name === "function") {
                return this.name(item);
            }
            return item[this.name];
        },
        getCountryFlag(item) {
            if (typeof this.flag === "function") {
                return this.flag(item);
            }
            return item[this.flag];
        },
        getName(item) {
            return item.name;
        },
        getImage(item) {
            return item.flag;
        },
        onSelect(item) {
            this.$emit("select", item);
        }
    },
    mounted() {
        axios
            .get(this.url)
            .then(response => {
                this.countries = response.data.map(country => {
                    return Object.assign(country, {
                        name: this.getCountryName(country),
                        flag: this.getCountryFlag(country)
                    });
                });
            })
            .catch(err => {
                console.error("Error in component CountrySuggest:", err);
            });
    }
};
</script>
