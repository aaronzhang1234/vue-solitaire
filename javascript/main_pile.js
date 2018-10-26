var one_card_mixin = {
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
}
