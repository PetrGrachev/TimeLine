<template>
    <div class="keywords-container">
        <div class="keywords-column" v-if="keywords.positive && keywords.positive.length">
            <h3 class="section-title">Положительные отзывы</h3>
            <div class="keywords-list">
                <div v-for="(keyword, index) in keywords.positive" :key="'positive-' + index"
                    class="keyword-item positive">
                    {{ keyword.phrase }}
                </div>
            </div>
        </div>

        <div class="keywords-column" v-if="keywords.negative && keywords.negative.length">
            <h3 class="section-title">Отрицательные отзывы</h3>
            <div class="keywords-list">
                <div v-for="(keyword, index) in keywords.negative" :key="'negative-' + index"
                    class="keyword-item negative">
                    {{ keyword.phrase }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAIFeedbacks } from '../../api/analytics/aiApi';

export default {
    name: 'KeywordsCloud',
    data() {
        return {
            keywords: {
                positive: [],
                negative: []
            },
        }
    },
    mounted() {
        const id = localStorage.getItem('id');
        getAIFeedbacks(id).then((data) => {
            this.keywords = data.keywords
        })
    },
}
</script>

<style scoped>
.keywords-container {
    display: flex;
    gap: 20px;
    width: 100%;
    max-width: 600px;
    padding: 20px;
}

.keywords-column {
    flex: 1;
    min-width: 0;
}

.section-title {
    font-size: 1rem;
    color: #333;
    margin-bottom: 12px;
    font-weight: bold;
}

.keywords-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.keyword-item {
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 0.9rem;
    transition: all 0.2s;
    word-break: break-word;
}

.keyword-item.positive {
    background-color: rgba(15, 78, 179, 0.1);
    color: #0F4EB3;
    border-left: 3px solid #0F4EB3;
}

.keyword-item.negative {
    background-color: rgba(231, 76, 60, 0.1);
    color: #E74C3C;
    border-left: 3px solid #E74C3C;
}
</style>