<template>
  <div class="typeahead">
    <input type="text" class="typeahead__input"
      :class="{'typeahead__input_active': isOpen}"
      @input="onChange"
      v-model="search"
      @keydown.down.prevent="onArrowDown"
      @keydown.up.prevent="onArrowUp"
      @keydown.enter.prevent="onEnter"
    />
    <ul class="typeahead__list" v-show="isOpen">
      <li class="typeahead__item_loading" v-if="isLoading">
        {{ this.loadingText }}
      </li>
      <li class="typeahead__item" v-else
        v-for="(result, i) in results"
        @click="setResult(result)"
        :class="{ 'typeahead__item_active': i === arrowCounter }"
      >
        <img class="typeahead__item-image" v-if="getImage(result)" :src="getImage(result)">
        <span class="typeahead__item-text" v-html="highlight(getName(result))"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: "TypeAhead",

    props: {
        items: {
            type: Array,
            required: true
        },
        isAsync: {
            type: Boolean,
            default: true
        },
        minLength: {
            type: Number,
            default: 1
        },
        limit: {
            type: Number,
            default: 4
        },
        loadingText: {
            type: String,
            default: "Loading..."
        },
        getName: {
            type: Function,
            default: item => item
        },
        getImage: {
            type: Function,
            default: item => item.image
        }
    },

    data() {
        return {
            search: "",
            isOpen: false,
            arrowCounter: 0
        };
    },

    computed: {
        results() {
            if (this.search.length < this.minLength) return [];

            // first uncapitalize all the things
            let items = this.items.filter(item => {
                let name = this.getName(item);
                if (!name) return false;
                return (
                    name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                );
            });

            // limit results
            if (this.limit) {
                items = items.slice(0, this.limit);
            }

            return items;
        },
        isLoading() {
            return this.isAsync && this.items.length === 0;
        }
    },

    methods: {
        onChange() {
            // Let's warn the parent that a change was made
            this.$emit("input", this.search);

            if (this.results.length || this.isLoading) {
                this.isOpen = true;
            }
            if (this.results.length) {
                this.arrowCounter = 0;
            }
        },
        onSelect(item) {
            this.$emit("select", Object.assign({}, item));
        },
        setResult(result) {
            this.search = this.getName(result);
            this.isOpen = false;
            this.onSelect(result);
        },
        onArrowDown(evt) {
            if (this.arrowCounter < this.results.length - 1) {
                this.arrowCounter = this.arrowCounter + 1;
            }
        },
        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1;
            }
        },
        onEnter() {
            if (this.arrowCounter > -1) {
                let result = this.results[this.arrowCounter];
                this.search = this.getName(this.results[this.arrowCounter]);
                this.isOpen = false;
                this.onSelect(result);
            }
        },
        handleClickOutside(evt) {
            if (!this.$el.contains(evt.target)) {
                this.isOpen = false;
                this.arrowCounter = -1;
            }
        },
        highlight(item) {
            // TODO: escapeRegexp
            var re = new RegExp(this.search, "ig");
            var matches = item.match(re),
                newItem;
            matches &&
                matches.forEach(match => {
                    newItem = item.replace(match, `<b>${match}</b>`);
                });
            return newItem;
        }
    },

    mounted() {
        document.addEventListener("click", this.handleClickOutside);
    },
    destroyed() {
        document.removeEventListener("click", this.handleClickOutside);
    }
};
</script>

<style scoped>
.typeahead {
    position: relative;
    max-width: 200px;
}

.typeahead__input {
    width: 100%;
    border-radius: 0.5em;
    padding: 0.5em 1em;
    font-size: 1em;
    border: 1px solid transparent;
    border-color: #dbdbdb;
    background-color: #fff;
}

.typeahead__input:focus {
    outline: 0;
}

.typeahead__input_active {
    border-bottom-style: dashed;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.typeahead__list {
    padding: 0.25em 0;
    margin: 0;
    border: 1px solid transparent;
    border-top-style: none;
    border-color: #dbdbdb;
    overflow: none;
    width: 100%;
    border-bottom-left-radius: 0.25em;
    border-bottom-right-radius: 0.25em;
}

.typeahead__item {
    list-style: none;
    text-align: left;
    padding: 4px 1em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.typeahead__item_loading {
    list-style: none;
    text-align: left;
    padding: 4px 1em;
}

/* fix scoped for dynamic element */
.typeahead__list .typeahead__item >>> b {
    color: lightseagreen;
}

.typeahead__item-image {
    width: 1.2rem;
    max-height: 1rem;
    margin-right: 4px;
}

.typeahead__item-text {
    flex-grow: 2;
}

.typeahead__item:hover,
.typeahead__item_active {
    background-color: lightblue;
}
</style>
