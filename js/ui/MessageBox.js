//////////////////////////////////////////////////////////////////////////////
var EMessageBox = { OK: 1, OKCancel: 2 };

//////////////////////////////////////////////////////////////////////////////
function messageBox( parameters )
{
    var messageBoxContainer = document.getElementById( "messageboxcontainer" );
    messageBoxContainer.style.visibility = "visible";

    var messageBox = document.getElementById( "messagebox" );
    messageBox.style.visibility = "visible";

    var messageBoxTitle = document.getElementById( "messageboxtitle" );
    messageBoxTitle.innerHTML  =  parameters.title || "Message";

    var messageBoxcontents = document.getElementById( "messageboxcontents_text" );
    messageBoxcontents.style.display = "block";
    messageBoxcontents.innerHTML  =  parameters.contents || "";
    
    switch( parameters.type )
    {
        case EMessageBox.OK:
        default:
        {
            var messageBoxButtonOK = document.getElementById( "messageboxbuttonok" ); 
            messageBoxButtonOK.style.visibility = "visible";
            messageBoxButtonOK.onclick = function()
            {
                messageBoxContainer.style.visibility = "hidden";
                messageBox.style.visibility = "hidden";
                messageBoxButtonOK.style.visibility = "hidden";
                messageBoxcontents.style.display = "none";
                if( parameters.onOK !== undefined )
                {
                    parameters.onOK();
                }
            }

            var messageBoxButtonSpacer = document.getElementById( "messageboxbuttonspacer" ); 
            messageBoxButtonSpacer.style.visibility = "hidden";
            
            var messageBoxButtonCancel = document.getElementById( "messageboxbuttoncancel" ); 
            messageBoxButtonCancel.style.visibility = "hidden";
        }
        break;
    }
}

//////////////////////////////////////////////////////////////////////////////
function stringPairBox( parameters )
{
    var messageBoxContainer = document.getElementById( "messageboxcontainer" );
    messageBoxContainer.style.visibility = "visible";

    var messageBox = document.getElementById( "messagebox" );
    messageBox.style.visibility = "visible";

    var messageBoxTitle = document.getElementById( "messageboxtitle" );
    messageBoxTitle.innerHTML  =  parameters.title || "Message";

    var messageBoxcontents_stringPair = document.getElementById( "messageboxcontents_stringpair" );
    messageBoxcontents_stringPair.style.display = "block";

    var messageBoxcontents_stringPair_first_text = document.getElementById( "messageboxcontents_stringpair_first_text" );
    messageBoxcontents_stringPair_first_text.innerHTML = parameters.firts_text || "Name";
    var messageBoxcontents_stringPair_first_value = document.getElementById( "messageboxcontents_stringpair_first_value" );
    messageBoxcontents_stringPair_first_value.innerHTML = "";

    var messageBoxcontents_stringPair_second_text = document.getElementById( "messageboxcontents_stringpair_second_text" );
    messageBoxcontents_stringPair_second_text.innerHTML = parameters.second_text || "Value";
    var messageBoxcontents_stringPair_second_value = document.getElementById( "messageboxcontents_stringpair_second_value" );
    messageBoxcontents_stringPair_second_value.innerHTML = "";
    
    var messageBoxButtonOK = document.getElementById( "messageboxbuttonok" ); 
    messageBoxButtonOK.style.visibility = "visible";
    var messageBoxButtonSpacer = document.getElementById( "messageboxbuttonspacer" ); 
    messageBoxButtonSpacer.style.visibility = "visible";
    var messageBoxButtonCancel = document.getElementById( "messageboxbuttoncancel" );
    messageBoxButtonCancel.style.visibility = "visible";
    
    messageBoxButtonOK.onclick = function()
    {
        if( parameters.onOK !== undefined )
        {
            var messageBoxcontents_stringPair_first_value = document.getElementById( "messageboxcontents_stringpair_first_value" );
            var first = messageBoxcontents_stringPair_first_value.value;
        
            var messageBoxcontents_stringPair_second_value = document.getElementById( "messageboxcontents_stringpair_second_value" );
            var second = messageBoxcontents_stringPair_second_value.value;

            parameters.onOK( { first: first, second: second } );
        }

        messageBoxContainer.style.visibility = "hidden";
        messageBoxButtonOK.style.visibility = "hidden";
        messageBoxButtonSpacer.style.visibility = "hidden";
        messageBoxButtonCancel.style.visibility = "hidden";
        messageBoxcontents_stringPair.style.display = "none";
        messageBox.style.visibility = "hidden";
    }

    messageBoxButtonCancel.onclick = function()
    {
        if( parameters.onCancel !== undefined )
        {
            parameters.onCancel();
        }

        messageBoxContainer.style.visibility = "hidden";
        messageBoxButtonOK.style.visibility = "hidden";
        messageBoxButtonSpacer.style.visibility = "hidden";
        messageBoxButtonCancel.style.visibility = "hidden";
        messageBoxcontents_stringPair.style.display = "none";
        messageBox.style.visibility = "hidden";
    }
}

//////////////////////////////////////////////////////////////////////////////
function stringBox( parameters )
{
    var messageBoxContainer = document.getElementById( "messageboxcontainer" );
    messageBoxContainer.style.visibility = "visible";

    var messageBox = document.getElementById( "messagebox" );
    messageBox.style.visibility = "visible";

    var messageBoxTitle = document.getElementById( "messageboxtitle" );
    messageBoxTitle.innerHTML  =  parameters.title || "Message";

    var messageBoxcontents_string = document.getElementById( "messageboxcontents_string" );
    messageBoxcontents_string.style.display = "block";

    var messageBoxcontents_string_text = document.getElementById( "messageboxcontents_string_text" );
    messageBoxcontents_string_text.innerHTML = parameters.firts_text || "Name";

    var messageBoxcontents_string_value = document.getElementById( "messageboxcontents_string_value" );
    messageBoxcontents_string_value.innerHTML = "";
    
    var messageBoxButtonOK = document.getElementById( "messageboxbuttonok" ); 
    messageBoxButtonOK.style.visibility = "visible";
    var messageBoxButtonSpacer = document.getElementById( "messageboxbuttonspacer" ); 
    messageBoxButtonSpacer.style.visibility = "visible";
    var messageBoxButtonCancel = document.getElementById( "messageboxbuttoncancel" );
    messageBoxButtonCancel.style.visibility = "visible";
    
    messageBoxButtonOK.onclick = function()
    {
        if( parameters.onOK !== undefined )
        {
            var first = messageBoxcontents_string_value.value;

            parameters.onOK( first );
        }

        messageBoxContainer.style.visibility = "hidden";
        messageBoxButtonOK.style.visibility = "hidden";
        messageBoxButtonSpacer.style.visibility = "hidden";
        messageBoxButtonCancel.style.visibility = "hidden";
        messageBoxcontents_string.style.display = "none";
        messageBox.style.visibility = "hidden";
    }

    messageBoxButtonCancel.onclick = function()
    {
        if( parameters.onCancel !== undefined )
        {
            parameters.onCancel();
        }

        messageBoxContainer.style.visibility = "hidden";
        messageBoxButtonOK.style.visibility = "hidden";
        messageBoxButtonSpacer.style.visibility = "hidden";
        messageBoxButtonCancel.style.visibility = "hidden";
        messageBoxcontents_string.style.display = "none";
        messageBox.style.visibility = "hidden";
    }
}
