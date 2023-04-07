<template>
    <transition name="el-zoom-in-top">
        <div
            class="el-table-filter"
            v-clickoutside="handleOutsideClick"
            v-show="showPopper">
            <div class="el-table-filter__content">
                <el-input v-if="column.filterType === 'search'" @keyup.native.enter="handleSearchEnter" clearable v-model="filterValue" :placeholder="'搜索 ' + column.label"/>
                <el-date-picker
                    v-else-if="column.filterType === 'dateSearch'"
                    size="mini"
                    @change="handleSearchEnter"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    v-model="filterValue"
                    type="date"
                    :placeholder="'搜索 ' + column.label">
                </el-date-picker>
                <div v-else>
                    <div key="loader" v-if="filterLoading" style="height: 100px" v-disco-loading="filterLoading"/>
                    <div key="no-data" style="text-align: center" v-else-if="!(filterLoading || (cachedFilters && cachedFilters.length))">
                        <peanut-empty></peanut-empty>
                        <div>暂无数据</div>
                    </div>
                    <div key="selections" v-else>
                        <el-input v-if="cachedFilters.length > 5" key="search" clearable v-model="searchKey" placeholder="搜索"/>
                        <el-scrollbar style="margin-top: 8px;border-bottom: 1px solid #DDDDDD" wrap-class="el-table-filter__wrap">
                            <ul class="el-table-filter__list" v-if="!multiple">
                                <template v-for="filter in filters">
                                    <li class="el-table-filter__list-item"
                                        :label="filter.title"
                                        :class="{ 'is-active': isActive(filter) }"
                                        @click="filterValue = filter.value">
                                        {{filter.text || filter.title || filter.label}}
                                    </li>
                                </template>
                            </ul>
                            <el-checkbox-group v-else class="el-table-filter__checkbox-group" v-model="filteredValue">
                                <template v-for="filter in filters">
                                    <el-checkbox
                                        :label="filter.value">
                                        {{filter.text || filter.title || filter.label}}
                                    </el-checkbox>
                                </template>
                            </el-checkbox-group>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
            <div class="el-table-filter-bottom">
                <el-button plain size="mini" @click="handleReset">{{t('el.table.resetFilter')}}</el-button>
                <el-button
                    size="mini"
                    type="primary"
                    @click="handleConfirm"
                    :class="{ 'is-disabled': searchDisabled }"
                    :disabled="searchDisabled">
                    {{t('el.table.confirmFilter')}}
                </el-button>
            </div>
        </div>
    </transition>
</template>
<script type="text/babel">
import Popper from 'element-ui/src/utils/vue-popper';
import {PopupManager} from 'element-ui/src/utils/popup';
import Locale from 'element-ui/src/mixins/locale';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import Dropdown from './dropdown';

export default {
    name: 'ElTableFilterPanel',

    mixins: [Popper, Locale],

    directives: {
        Clickoutside
    },
    props: {
        placement: {
            type: String,
            default: 'bottom-start'
        }
    },

    methods: {
        isActive(filter) {
            return filter.value === this.filterValue;
        },

        handleSearchEnter() {
            if (this.filterValue) {
                this.handleConfirm()
            } else {
                this.handleOutsideClick()
            }
        },

        handleOutsideClick() {
            setTimeout(() => {
                this.showPopper = false;
            }, 16);
        },

        handleConfirm() {
            if (["search","dateSearch"].includes(this.column.filterType)) {
                this.handleSelect(this.filterValue)
                return;
            }
            this.confirmFilter(this.filteredValue);
            this.handleOutsideClick();
        },

        handleReset() {
            this.filteredValue = [];
            this.confirmFilter(this.filteredValue);
            this.handleOutsideClick();
        },

        handleSelect(filterValue) {
            this.filterValue = filterValue;

            if ((typeof filterValue !== 'undefined') && (filterValue !== null)) {
                this.confirmFilter(this.filteredValue);
            } else {
                this.confirmFilter([]);
            }

            this.handleOutsideClick();
        },

        confirmFilter(filteredValue) {
            this.table.store.commit('filterChange', {
                column: this.column,
                values: filteredValue
            });
            if (this.table.filterMode === "local") {
                this.table.store.updateAllSelected();
            }
        },

        loadFilters() {
            this.searchKey = "";
            if (typeof this.column.filters === 'function') {
                let filters = Object.keys(this.table.store.states.filters).filter(key => key !== this.column.id).map(key => key + ":" + this.table.store.states.filters[key].values.join(",")).join(",")
                if (this.lastFilters === null || this.lastFilters !== filters) {
                    this.filterLoading = true;
                    new Promise(resolve => {
                        this.column.filters(resolve);
                    }).then(res => {
                        if (!res?.length) {
                            this.lastFilters = null;
                        }
                        this.cachedFilters = res;
                    }).catch(() => {
                        this.lastFilters = null;
                        this.cachedFilters = [];
                    }).finally(() => {
                        this.filterLoading = false;
                        this.$nextTick(() => {
                            this.updatePopper();
                        })
                    })
                    this.lastFilters = filters;
                }
            } else {
                this.cachedFilters = this.column.filters;
            }
        }
    },

    data() {
        return {
            table: null,
            cell: null,
            column: null,
            cachedFilters: null,
            filterLoading: false,
            lastFilters: null,
            searchKey: ""
        };
    },

    computed: {
        searchDisabled() {
            if (this.column) {
                let filterValues = this.column.filteredValue || [];
                if (this.column.filterType === 'select' && this.column.filterMultiple) {
                    return !filterValues.length;
                } else {
                    return filterValues[0] === null || filterValues[0] === undefined || filterValues[0] === '';
                }
            }
            return true;
        },
        filters() {
            if (this.searchKey) {
                return this.cachedFilters.filter(item => (item.text || item.title || item.label).indexOf(this.searchKey) !== -1)
            }
            return this.cachedFilters;
        },
        filterValue: {
            get() {
                return (this.column.filteredValue || [])[0];
            },
            set(value) {
                if (this.filteredValue) {
                    if ((typeof value !== 'undefined') && (value !== null) && (value !== "")) {
                        this.filteredValue.splice(0, 1, value);
                    } else {
                        this.filteredValue.splice(0, 1);
                    }
                }
            }
        },
        filteredValue: {
            get() {
                if (this.column) {
                    return this.column.filteredValue || [];
                }
                return [];
            },
            set(value) {
                if (this.column) {
                    this.column.filteredValue = value;
                }
            }
        },
        multiple() {
            if (this.column) {
                return this.column.filterMultiple;
            }
            return true;
        }
    },

    mounted() {
        this.popperElm = this.$el;
        this.referenceElm = this.cell;
        this.table.bodyWrapper.addEventListener('scroll', () => {
            // this.updatePopper();
            this.showPopper = false;
        });

        this.$watch('showPopper', (value) => {
            if (this.column) this.column.filterOpened = value;
            if (value) {
                Dropdown.open(this);
                this.loadFilters();
            } else {
                Dropdown.close(this);
            }
        });
    },
    watch: {
        showPopper(val) {
            if (val === true && parseInt(this.popperJS._popper.style.zIndex, 10) < PopupManager.zIndex) {
                this.popperJS._popper.style.zIndex = PopupManager.nextZIndex();
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.el-table-filter {
    padding: 8px;

    .el-table-filter__checkbox-group {
        padding: 0;

        ::v-deep {
            .el-checkbox {
                margin: 0 0 8px;
                display: flex;
                align-items: center;
                font-weight: normal;
                color: rgba(0, 0, 0, 0.85);

                .el-checkbox__label {
                    flex: 1;
                    max-width: 450px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }

    .el-table-filter-bottom {
        padding: 8px 0 0;
        border: none;
        display: flex;
        align-items: center;
        font-weight: normal;
        justify-content: flex-end;

        ::v-deep {
            .el-button {
                width: 90px;
            }
        }
    }
}
</style>
