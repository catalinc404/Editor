//////////////////////////////////////////////////////////////////////////////
var EMessageBox = { OK: 1, OKCancel: 2 };

function messageBox( parameters )
{
    var messageBoxContainer = document.getElementById( "messageboxcontainer" );
    messageBoxContainer.style.visibility = "visible";

    var messageBox = document.getElementById( "messagebox" );
    messageBox.style.visibility = "visible";

    var messageBoxTitle = document.getElementById( "messageboxtitle" );
    messageBoxTitle.innerHTML  =  parameters.title || "Message";

    var messageBoxcontents = document.getElementById( "messageboxcontents" );
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
