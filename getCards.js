base_url = "https://deckofcardsapi.com/api/deck/";
deck_id = '';
var obj = {
    deck_id: ''
} 
var main_pile = {
    cards:[]
}
var holding_pile = {
    cards:[]
}
var pile_1 = {
    cards:[]
}
var pile_2 = {
    cards:[]
}
var pile_3 = { cards:[]
}
var pile_4 = {
    cards:[]
}
var pile_5 = {
    cards:[]
}
var pile_6 = {
    cards:[]
}
var pile_7 = {
    cards:[]
}
var spade_pile = {
    cards:[] 
}
var club_pile = {
    cards:[]
}
var diamond_pile = {
    cards:[]
}
var heart_pile = {
    cards:[]
}
Vue.component("card-item",{
    props:['card_img'],
    template:'<img :src="card_img"></img>'
})

var main_pile_div = new Vue({
   el: '#main_pile',
   data: main_pile
})

var pile_1_div = new Vue({
    el: '#pile_1',
    data: pile_1
})
var pile_2_div = new Vue({
    el: '#pile_2',
    data: pile_2
})
var pile_3_div = new Vue({
    el: '#pile_3',
    data: pile_3
})
var pile_4_div = new Vue({
    el: '#pile_4',
    data: pile_4
})
var pile_5_div = new Vue({
    el: '#pile_5',
    data: pile_5
})
var pile_6_div = new Vue({
    el: '#pile_6',
    data: pile_6
})
var pile_7_div = new Vue({
    el: '#pile_7',
    data: pile_7
})






var app1 = new Vue({
    el: '#app-1',
    data: obj,
    methods:{ 
        get_deck(){
            axios
             .get(base_url+'new/shuffle/')
             .then(function(response){
                console.log('hello');
                console.log(response);
                obj.deck_id = response.data.deck_id;
                app1.place_cards_in_main();
             });

        },
        place_cards_in_main(){
            var promises = [];
            for(var i = 0; i<=51; i++){
                promises.push(axios.get(base_url+this.deck_id+'/draw/'));
                /*
                axios
                 .get(base_url+this.deck_id+'/draw/')
                 .then(function(response){
                     response.data.cards[0];
                     app1.push_card(response, i);
                 })
                 */
            }
            axios.all(promises).then(function(results){
                results.forEach(function(response){
                    console.log(response);
                    app1.push_card(response);
                })
                for(var i =0; i<=6; i++){
                    for(var j =i; j>=0; j--){
                       app1.move_cards(i); 
                    }
                }
            });
        },
        push_card(response, index){
             var card_info = response.data.cards[0];
             var card = {index:response.data.remaining, code:card_info.code, img:card_info.image};
             main_pile.cards.push(card);
             console.log(main_pile.cards);
        },
        move_cards(pile_num){
            var card = main_pile.cards.pop();

            switch(pile_num){
                case 0:
                    pile_1.cards.push(card);
                    break;
                case 1:
                    pile_2.cards.push(card);
                    break;
                case 2:
                    pile_3.cards.push(card);
                    break;
                case 3:
                    pile_4.cards.push(card);
                    break;
                case 4:
                    pile_5.cards.push(card);
                    break;
                case 5:
                    pile_6.cards.push(card);
                    break;
                case 6:
                    pile_7.cards.push(card);
                    break;
            }
        }
    }
})

