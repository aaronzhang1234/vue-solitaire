base_url = "https://deckofcardsapi.com/api/deck/";
deck_id = '';
var obj = {
    deck_id: ''
} 
var main_pile = { cards:[],
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
    mixins:[startup_mixin]
})

