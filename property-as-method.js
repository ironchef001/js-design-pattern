_ = require('underscore-plus');

var Book = function(name, price){
    var priceChanging=[],
        priceChanged = [];

    this.name = function(val){
        return name;
    }

    this.price = function(val){
        var that=this;
        var valid=true;
        if (!_.isUndefined(val) && !_.isNull(val)){
            _.each(priceChanging, function(priceChangingEvent, prop){
                if(!priceChangingEvent(that,val)){
                    valid=false;
                    return;
                }
            });

            if(!valid){
                return price;
            } else{
                price=val;
                _.each(priceChanged, function(priceChangedEvent, prop){
                    priceChangedEvent(that);
                });
            }
        }
        return price;
    }

    this.onPriceChanging = function(callback){
        priceChanging.push(callback);
    }

    this.onPricedChanged = function(callback){
        priceChanged.push(callback);
    }
}

var book = new Book('Javascript Desgin Pattern', 34.56);

console.log('The book name is: ', book.name());
console.log('The book price is:', book.price());

book.onPriceChanging(function(b,price){
    if (price>100){
        console.log('System error, price',price,'has gone unexpected high for book',b.name());
        return false;
    }
    return true;
});

book.onPricedChanged(function(b){
    console.log('The book price has changed to $',b.price());
});

//book.price(24.67);
book.price(203.45);


