<template>
    <div>
        <h2 class="section-title">Клиенты</h2>
        <div class="client-stats-container">
            <!-- Уникальные клиенты -->
            <div class="client-card">
                <i class="fas fa-users icon"></i>
                <div class="text-block">
                    <p class="label">Уникальных клиентов</p>
                    <p class="value">{{ unique_customers }}</p>
                </div>
            </div>

            <!-- Частый клиент -->
            <div class="client-card">
                <UserAvatar :avatarUrl="most_frequent_client.uuid" :name="most_frequent_client.first_name"
                    class="client-avatar" />
                <div class="text-block">
                    <p class="label">Самый частый клиент</p>
                    <p class="value">
                        {{ most_frequent_client.first_name }} {{ most_frequent_client.last_name }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserAvatar from '../UserAvatar.vue';


export default {
    components: { UserAvatar },
    data() {
        return {
            unique_customers: 1,
            most_frequent_client: {
                first_name: "Петр",
                last_name: "Грачев",
                uuid: "",
            }
        }
    }
};
</script>

<style scoped>
.section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--text-color);
}

.client-stats-container {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    margin-top: 20px;
    flex-wrap: wrap;
}

.client-card {
    display: flex;
    align-items: center;
    background-color: var(--card-background-color);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 20px;
    flex: 1 1 300px;
    min-width: 260px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.icon {
    font-size: 2rem;
    color: #0F4EB3;
    margin-right: 15px;
}

.client-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
    border: 2px solid #0F4EB3;
}

.text-block {
    display: flex;
    flex-direction: column;
}

.label {
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 4px;
}

.value {
    font-size: 1.7rem;
    font-weight: bold;
    color: #0F4EB3;
}
</style>