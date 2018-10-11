var finished_mixins = {
    methods:{
        drag_over:function(e){
            e.preventDefault();
        },
        on_drop:function(e){
            e.preventDefault();
            var from_pile = e.dataTransfer.getData("from_pile");
            var from_card_code = e.dataTransfer.getData("card_id");
            var to_pile = this.get_pile_name(e.toElement);
            var to_card_code = this.get_last_code(to_pile); 
            console.log(from_pile + " " + from_card_code);
            console.log(to_pile + " "+to_card_code);
        },
        logic_is_correct:function(to_card_code, from_card_code){
            from_card_value = from_card_code[0];
            from_card_suit = from_card_code[1];
            to_card_value = to_card_code[0];
            to_card_suit = to_card_code[0];
            if(value_is_correct(to_card_value, from_card_value) && suit_is_correct(to_card_suit, from_card_suit)){
            }
        },
        value_is_correct:function(to_card_value, from_card_value){
            
        },
        suit_is_correct:function(to_card_suit, from_card_suit){
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
        get_last_code:function(pile_name){
            switch(pile_name){
                case 'pile_spade':
                   if(pile_spade.cards.length>0)
                       return pile_1.cards[(pile_1.cards.length)-1].code;
                   break;
                case 'pile_club':
                   if(pile_club.cards.length>0)
                       return pile_2.cards[(pile_2.cards.length)-1].code;
                   break;
                case 'pile_diamond':
                   if(pile_diamond.cards.length>0)
                       return pile_3.cards[(pile_3.cards.length)-1].code; 
                   break;
                case 'pile_heart':
                   if(pile_heart.cards.length>0)
                       return pile_4.cards[(pile_4.cards.length)-1].code;
                   break;
            }
            return null;
        } 
    }
}
