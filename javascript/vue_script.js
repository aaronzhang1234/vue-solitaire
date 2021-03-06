base_url = "https://deckofcardsapi.com/api/deck/";
deck_id = '';
var startup_mixin = startup_mixin;
var undo_el = {
    undos: []
}
var start_el = {
    deck_id: '',
    before_game:true,
    show_click_cards:true,
    show_loading: false
} 
var main_pile = { 
    cards:[],
    playable_cards:[],
    dark_cards:[],
    is_easy:true
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
    mixins:[generic_mixin, one_card_mixin]
})

var pile_1_div = new Vue({
    el: '#pile_1',
    data: pile_1,
    mixins:[generic_mixin, playing_field_mixin,dragging_mixin]
})
var pile_2_div = new Vue({
    el: '#pile_2',
    data: pile_2,
    mixins:[generic_mixin, playing_field_mixin,dragging_mixin]
})
var pile_3_div = new Vue({
    el: '#pile_3',
    data: pile_3,
    mixins:[generic_mixin, playing_field_mixin,dragging_mixin]
})
var pile_4_div = new Vue({
    el: '#pile_4',
    data: pile_4,
    mixins:[generic_mixin, playing_field_mixin,dragging_mixin]
})
var pile_5_div = new Vue({
    el: '#pile_5',
    data: pile_5,
    mixins:[generic_mixin, playing_field_mixin,dragging_mixin]
})
var pile_6_div = new Vue({
    el: '#pile_6',
    data: pile_6,
    mixins:[generic_mixin, playing_field_mixin,dragging_mixin]
})
var pile_7_div = new Vue({
    el: '#pile_7',
    data: pile_7,   
    mixins:[generic_mixin, playing_field_mixin,dragging_mixin]
})


var spade_div = new Vue({
    el: '#pile_spade',
    data: pile_spade,
    mixins:[generic_mixin, finished_mixin,dragging_mixin]
})
var club_div = new Vue({
    el: '#pile_club',
    data: pile_club,
    mixins:[generic_mixin, finished_mixin,dragging_mixin]
})
var diamond_div = new Vue({
    el: '#pile_diamond',
    data: pile_diamond,
    mixins:[generic_mixin, finished_mixin,dragging_mixin]
})
var heart_div = new Vue({
    el: '#pile_heart',
    data: pile_heart,
    mixins:[generic_mixin, finished_mixin,dragging_mixin]
})
var restart = new Vue({
    el: '#restart',
    mixins:[restart_mixin]
})
var start_game = new Vue({
    el: '#start_screen',
    data: start_el,
    mixins:[startup_mixin]
})
var undo_div = new Vue({
    el: '#undo',
    data: undo_el,
    mixins:[generic_mixin, undo_mixin]
})

