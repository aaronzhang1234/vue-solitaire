base_url = "https://deckofcardsapi.com/api/deck/";
deck_id = '';
var obj = {
    deck_id: ''
} 
var main_pile = {
    cards:[],
    playable_cards:[]
}
var pile_1 = {
    cards:[]
}
var pile_2 = {
    cards:[]
}
var pile_3 = { 
    cards:[]
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
var pile_spade = {
    cards:[] 
}
var pile_club = {
    cards:[]
}
var pile_diamond = {
    cards:[]
}
var pile_heart = {
    cards:[]
}
Vue.component("card-item",{
    props:['card_img', "card_id", "card.active"],
    template:'<img :src="card_img" :id="card_id"></img>'
})

var main_pile_div = new Vue({
    el: '#main_pile',
    data: main_pile,
    methods:{
        on_click:function(){
            if(this.cards.length<=0){
                this.playable_cards.reverse();
                this.cards = this.playable_cards;
                this.playable_cards = []; 
            }else{
                this.playable_cards.push(this.cards.pop());
            }
        },
        on_drag_start:function(e){
            e.dataTransfer.setData("card_id", this.playable_cards[this.playable_cards.length-1].code);
            e.dataTransfer.setData("from_pile", "playable_cards");   
        } 
    }
})

var pile_1_div = new Vue({
    el: '#pile_1',
    data: pile_1,
    mixins:[playing_field_mixin,dragging_mixin]
})
var pile_2_div = new Vue({
    el: '#pile_2',
    data: pile_2,
    mixins:[playing_field_mixin,dragging_mixin]
})
var pile_3_div = new Vue({
    el: '#pile_3',
    data: pile_3,
    mixins:[playing_field_mixin,dragging_mixin]
})
var pile_4_div = new Vue({
    el: '#pile_4',
    data: pile_4,
    mixins:[playing_field_mixin,dragging_mixin]
})
var pile_5_div = new Vue({
    el: '#pile_5',
    data: pile_5,
    mixins:[playing_field_mixin,dragging_mixin]
})
var pile_6_div = new Vue({
    el: '#pile_6',
    data: pile_6,
    mixins:[playing_field_mixin,dragging_mixin]
})
var pile_7_div = new Vue({
    el: '#pile_7',
    data: pile_7,
    mixins:[playing_field_mixin,dragging_mixin]
})


var spade_div = new Vue({
    el: '#pile_spade',
    data: pile_spade,
    mixins:[finished_mixins,dragging_mixin]
})
var club_div = new Vue({
    el: '#pile_club',
    data: pile_club,
    mixins:[finished_mixins,dragging_mixin]
})
var diamond_div = new Vue({
    el: '#pile_diamond',
    data: pile_diamond,
    mixins:[finished_mixins,dragging_mixin]
})
var heart_div = new Vue({
    el: '#pile_heart',
    data: pile_heart,
    mixins:[finished_mixins,dragging_mixin]
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
                       if(j==0){
                           app1.move_cards(i, true); 
                       }else{
                           app1.move_cards(i, false); 
                       }
                    }
                }
                for(var i =0; i<main_pile.cards.length; i++){
                    main_pile.cards[i].active=true;
                }
            });
        },
        push_card(response, index){
             var card_info = response.data.cards[0];
             var card = {index:response.data.remaining, code:card_info.code, img:card_info.image, active:false};
             main_pile.cards.push(card);
             console.log(main_pile.cards);
        },
        move_cards(pile_num, is_active){
            var card = main_pile.cards.pop();
            if(is_active){
                card.active=true;
            }

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

