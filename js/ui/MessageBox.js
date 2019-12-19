//////////////////////////////////////////////////////////////////////////////
var EMessageBox = { OK: 1, OKCancel: 2 };

//////////////////////////////////////////////////////////////////////////////
function messageBox( parameters )
{
    var width  = parameters.width || 400;
    var height = parameters.height || 300;

    var background               = new _UI.Element( null, { tag: "div", properties: { id: "messageboxcontainer", className: "noselect", style: "display: block; float:left; width:100%; height:100%; background-color:rgba(0,0,0,0.5); z-index:10000;" } } );
    var windowFrame              = new _UI.WindowElement( background, "messageboxWindow", { left: "center", top: "center", width: width, height: height } );
    var windowTitle              = new _UI.TextElement( windowFrame, "messageboxTitle", { left: 10, top: 6, width: "calc(100% - " + 20 + "px)", height: 16 }, parameters.title || "Message" );
    var windowTitleSeparator     = new _UI.HLineElement( windowFrame, "messageboxTitleSeparator", { left: 0, top: 24  } );
    var windowContents           = new _UI.TextElement( windowFrame, "messageboxContents", { left: 10, top: 28, width: "calc(100% - " + 20 + "px)", height: (height - 70) }, parameters.contents || "" );
    var windowContentsSeparator  = new _UI.HLineElement( windowFrame, "messageboxContentsSeparator", { left: 0, top: (height - 38) } );

    switch( parameters.type )
    {
        case EMessageBox.OK:
        default:
        {
            var onClickOKCallback = function()
            {
                var element = document.getElementById( "messageboxcontainer" );
                element.parentNode.removeChild( element );

                if( parameters.onOK !== undefined )
                {
                    parameters.onOK();
                }                
            }
            var buttonOK = new _UI.ButtonElement( windowFrame, "messageboxbuttonok", { left: "center", top: (height - 28), width: 40, height: 20 }, "OK", onClickOKCallback );
        }
        break;
    }
}

//////////////////////////////////////////////////////////////////////////////
function stringPairBox( parameters )
{
    /*
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
    */
}

//////////////////////////////////////////////////////////////////////////////
function stringBox( parameters )
{
    /*
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
    */
}
