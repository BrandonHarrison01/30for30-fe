const arOfOb = [
    {
        category_id: 1,
        category_name: "Health & Fitness",
        complete: false,
        description: "running makes me feel good and I want to put more energy into becoming the best I can be",
        id: 109,
        item_name: "Run a marathon",
        privacy: "public",
        target_date: "2021-06-22",
        user_id: 9
    },
    {
        category_id: 1,
        category_name: "Health & Fitness",
        complete: false,
        description: "cv",
        id: 41,
        item_name: "x",
        privacy: "private",
        target_date: "vb",
        user_id: 16,
    },
    {
        category_id: 1,
        category_name: "Health & Fitness",
        complete: false,
        description: "this",
        id: 38,
        item_name: "is",
        privacy: "private",
        target_date: "cheating",
        user_id: 16
    }
]

console.log(arOfOb.filter(ob => ob.item_name.includes('x')))