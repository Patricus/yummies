# Store Shape

```
store = {
    session: {},
    businessDetail: {
        businessId: {
                businessData,
                user: {userData for business owner},
                reviews: {
                    reviewId: {
                            reviewData,
                            user: {userData of author}
                    },
                    optionalOrderedList: []
                }
        }
    },
    allBusinesses: {
        businessId: {
            businessData,
            user: {userData for business owner}
        },
        optionalOrderedList: []
    }
}
```

# Database Schema

![database](./yelp-database.jpg)
