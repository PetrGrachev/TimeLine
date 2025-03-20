<template>
    <span ref="tooltipTarget" class="user-info" v-tooltip.right="tooltipOptions" @mouseover="fetchUserData">
        <slot></slot>
    </span>
</template>

<script>
import { ref, watch } from 'vue';
import { getUser } from '../../api/userApi';

export default {
    name: 'UserTooltip',
    props: {
        userId: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const tooltipContent = ref('Загрузка...');
        const isDataLoaded = ref(false);
        const tooltipOptions = ref({
            value: tooltipContent.value,
            escape: false,
            pt: {
                arrow: {
                    style: {
                        borderBottomColor: '#f0f0f0'
                    }
                },
                text: {
                    style: {
                        backgroundColor: '#f0f0f0',
                        color: '#333',
                        padding: '10px',
                        borderRadius: '8px'
                    }
                }
            }
        });

        const fetchUserData = async () => {
            if (!isDataLoaded.value) {
                try {
                    const user = await getUser(props.userId);
                    tooltipContent.value = `
              <div>
                <i class="fas fa-user"></i> ${user.first_name} ${user.last_name}
                <i class="fas fa-city"></i> ${user.city}
                <i class="fas fa-phone"></i> ${user.telephone}
                <i class="fas fa-info-circle"></i> ${user.about}
              </div>
            `;
                    isDataLoaded.value = true;
                } catch (error) {
                    tooltipContent.value = 'Ошибка загрузки данных.';
                    console.error("Ошибка ", error.message);
                }
            }
        };

        watch(tooltipContent, (newValue) => {
            tooltipOptions.value = { ...tooltipOptions.value, value: newValue };

        });

        const tooltipTarget = ref(null);

        return {
            tooltipContent,
            fetchUserData,
            tooltipOptions,
            tooltipTarget
        };
    }
};
</script>

<style scoped>
.user-info {
    cursor: pointer;
    text-decoration: underline;
}
</style>