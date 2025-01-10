<template>
    <div class="vue-yoast vue-yoast-assessor vue-yoast-content-assessor">
        <div v-for="(item, index) in items" :key="index" :class="item._class">
            <slot name="item" v-bind:item="item">
                <span class="vue-yoast-assessor-badge">&nbsp;</span>
                <span class="vue-yoast-assessor-text" v-html="item.text"></span>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
// import { debounce } from "debounce";
import { Paper, ContentAssessor, interpreters, string } from "yoastseo";
import { getAssessorRatings, getI18n } from "./utils.js";

const { removeHtmlBlocks } = string;
const { scoreToRating } = interpreters;
const ratings = getAssessorRatings();


// Props
const props = defineProps({
    title: { type: String, default: "" },
    titleWidth: { type: Number, default: 0 },
    description: { type: String, default: "" },
    keyword: { type: String, default: "" },
    url: { type: String, default: "" },
    text: { type: String, default: "" },
    locale: { type: String, default: "en_US" },
    marker: { type: Object, default: null },
    permalink: { type: String, default: "" },
    translations: { type: Object, default: null },
    resultFilter: {
        type: Function,
        default: (result) => result,
    },
});

// Data
const assessorResults = ref([]);
const assessorResultsByRating = ref({});
const overallContentScore = ref(null);
const overallContentRating = ref(null);
const contentAssessor = ref(null);
const i18n = ref(null);
const paper = ref(null);

// Computed properties
const items = computed(() => {
    const res = [];
    ratings.forEach((rating) => {
        const items = assessorResultsByRating.value[rating];
        if (!items) return;
        items.forEach((item) => {
            item._class = [
                "vue-yoast-assessor-item",
                `vue-yoast-assessor-item-${item.rating}`,
            ];
            res.push(item);
        });
    });
    return res;
});

// Methods
const refreshPaper = () => {
    const cleanText = removeHtmlBlocks(props.text);
    console.log('cleanText: ', cleanText);
    
    paper.value = new Paper(cleanText, {
    // paper.value = new Paper(props.text, {
        keyword: props.keyword,
        description: props.description,
        url: props.url,
        title: props.title,
        titleWidth: props.titleWidth,
        locale: props.locale,
        permalink: props.permalink,
    });
    console.log('paper: ', paper);
    console.log('paper.value: ', paper.value);
};

const refresh = () => {
    refreshPaper();

    contentAssessor.value = new ContentAssessor(i18n.value, {
        marker: props.marker,
    });

    contentAssessor.value.assess(paper.value);
    const overallScore = contentAssessor.value.calculateOverallScore();
    overallContentScore.value = overallScore;
    overallContentRating.value = scoreToRating(overallScore / 10);

    assessorResults.value = [];
    assessorResultsByRating.value = {};

    contentAssessor.value.results.forEach((item) => {
        const result = props.resultFilter({
            rating: scoreToRating(item.score),
            score: item.score,
            text: item.text,
        });
        assessorResults.value.push(result);
        if (assessorResultsByRating.value[result.rating]) {
            assessorResultsByRating.value[result.rating].push(result);
        } else {
            assessorResultsByRating.value[result.rating] = [result];
        }
    });
};

// Watchers
// const debouncedRefresh = debounce(refresh, 1000);

watch(
    () => [
        props.title,
        props.description,
        props.keyword,
        props.url,
        props.text,
        props.locale,
        props.translations,
    ],
    () => {
        if (props.translations) i18n.value = getI18n(props.translations);
        // debouncedRefresh();
    }
);

// Lifecycle hooks
onMounted(() => {
    i18n.value = getI18n(props.translations);
    console.log('i18n: ', i18n.value);
    console.log('ratings: ', ratings.value);
    console.log('Items: ', items.value);
    refresh();
});
</script>

<style scoped></style>
