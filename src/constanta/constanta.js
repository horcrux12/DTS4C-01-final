export const NewsCategory = [
    'general',
    'science',
    'sports',
    'business',
    'health',
    'entertainment',
    'tech',
    'politics',
    'food',
    'travel'
]

export const NewsCategoryItem = NewsCategory.map((item) => ({
    [item] : item
}))

export const ContainerMaxWidth = 'xl'

export const MethodConstanta = {
    GET : "GET",
}