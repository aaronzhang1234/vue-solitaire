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
function click_on(){
    console.log('clicked');
}
Vue.component("card-item",{
    props:['card_img', "card_id"],
    template:'<img :src="card_img" :id="card_id"></img>'
})

var main_pile_div = new Vue({
   el: '#main_pile',
   data: main_pile
})

var global_mixin={
    methods:{
        on_drag_start: function(e){
            console.log('hello');
            var card_id = e.srcElement.id;
            e.dataTransfer.setData("card_id", card_id);
            var from_pile = e.srcElement.parentElement.parentElement.parentElement.id;
            e.dataTransfer.setData("from_pile", from_pile);
        },   
        drag_over:function(e){
            e.preventDefault();
        },
        on_drop:function(e){
            e.preventDefault();
            console.log('bello');
            console.log(e.dataTransfer.getData("card_id"));
            console.log(e.dataTransfer.getData("from_pile"));
            card = pile_1.cards.pop();
            pile_2.cards.push(card);
        }, 
        get_card(){
            var card;
            switch(pile_name){
                case 'pile_1':
                   card = pile_1.cards.pop(); 
                   break;
                case 'pile_2':
                   card = pile_2.cards.pop();
                   break;
                case 'pile_3':
                   card = pile_3.cards.pop();
                   break;
                case 'pile_4':
                   card = pile_4.cards.pop();
                   break;
                case 'pile_5':
                   card = pile_5.cards.pop();
                   break;
                case 'pile_6':
                   card = pile_6.cards.pop();
                   break;
                case 'pile_7':
                   card = pile_7.cards.pop();
                   break;
            }
        }
    }    
}
var pile_1_div = new Vue({
    el: '#pile_1',
    data: pile_1,
    mixins:[global_mixin]
})
var pile_2_div = new Vue({
    el: '#pile_2',
    data: pile_2,
    mixins:[global_mixin]
})
var pile_3_div = new Vue({
    el: '#pile_3',
    data: pile_3,
    mixins:[global_mixin]
})
var pile_4_div = new Vue({
    el: '#pile_4',
    data: pile_4,
    mixins:[global_mixin]
})
var pile_5_div = new Vue({
    el: '#pile_5',
    data: pile_5,
    mixins:[global_mixin]
})
var pile_6_div = new Vue({
    el: '#pile_6',
    data: pile_6,
    mixins:[global_mixin]
})
var pile_7_div = new Vue({
    el: '#pile_7',
    data: pile_7,
    mixins:[global_mixin]
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

