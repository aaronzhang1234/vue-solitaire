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
    props:['card_img', "card_id", "card.active"],
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
            var from_pile = e.srcElement.parentElement.parentElement.parentElement.parentElement.id;
            var bleh = e.srcElement.parentElement.parentElement.parentElement;
            console.log(bleh);
            console.log(from_pile);
            e.dataTransfer.setData("from_pile", from_pile);
        },   
        drag_over:function(e){
            e.preventDefault();
        },
        on_drop:function(e){
            e.preventDefault();
            var from_pile = e.dataTransfer.getData("from_pile");
            var card_code = e.dataTransfer.getData("card_id");
            var to_pile = this.get_pile_name(e.toElement);
            this.add_card(to_pile, from_pile);
        }, 
        get_pile_name:function(element){
            while(element){ 
                if(element.id!=null && (element.id).substring(0,4)=="pile"){
                    return element.id
                }
                element = element.parentElement;
            }
            return element.id;
        },
        add_card:function(pile_name_to, pile_name_from){
            console.log(pile_name_to);
            console.log(pile_name_from);
            var card_to_add = this.get_card(pile_name_from)
            console.log(card_to_add);            
            switch(pile_name_to){
                case 'pile_1':
                   pile_1.cards.push(card_to_add); 
                   break;
                case 'pile_2':
                   pile_2.cards.push(card_to_add);
                   break;
                case 'pile_3':
                   pile_3.cards.push(card_to_add);
                   break;
                case 'pile_4':
                   pile_4.cards.push(card_to_add);
                   break;
                case 'pile_5':
                   pile_5.cards.push(card_to_add);
                   break;
                case 'pile_6':
                   pile_6.cards.push(card_to_add);
                   break;
                case 'pile_7':
                   pile_7.cards.push(card_to_add);
                   break;
            }
            
        },
        get_card:function(pile_name){
            var card;
            switch(pile_name){
                case 'pile_1':
                   card = pile_1.cards.pop(); 
                   if(pile_1.cards.length>0){
                       pile_1.cards[(pile_1.cards.length)-1].active=true;
                   } 
                   break;
                case 'pile_2':
                   card = pile_2.cards.pop();
                   if(pile_2.cards.length>0){
                       pile_2.cards[(pile_1.cards.length)-1].active=true;
                   }
                   break;
                case 'pile_3':
                   card = pile_3.cards.pop();
                   if(pile_3.cards.length>0){
                       pile_3.cards[(pile_3.cards.length)-1].active=true;
                   }
 
                   break;
                case 'pile_4':
                   card = pile_4.cards.pop();
                   if(pile_4.cards.length>0){
                       pile_4.cards[(pile_4.cards.length)-1].active=true;
                   }
 
                   break;
                case 'pile_5':
                   card = pile_5.cards.pop();
                   if(pile_5.cards.length>0){
                       pile_5.cards[(pile_5.cards.length)-1].active=true;
                   }
 
                   break;
                case 'pile_6':
                   card = pile_6.cards.pop();
                   if(pile_6.cards.length>0){
                       pile_6.cards[(pile_6.cards.length)-1].active=true;
                   }
 
                   break;
                case 'pile_7':
                   card = pile_7.cards.pop();
                   if(pile_7.cards.length>0){
                       pile_7.cards[(pile_7.cards.length)-1].active=true;
                   } 
                   break;
            }
            return card;
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
                       if(j==0){
                           app1.move_cards(i, true); 
                       }else{
                           app1.move_cards(i, false); 
                       }
                    }
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

