export const formatDate = (dateString, options = {}) => {
    const defaultOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...options
    };

    return new Date(dateString).toLocaleDateString('en-US', defaultOptions);
};

export const formatDateTime = (dateString) => {
    return formatDate(dateString, {
        hour: '2-digit',
        minute: '2-digit'
    });
};
