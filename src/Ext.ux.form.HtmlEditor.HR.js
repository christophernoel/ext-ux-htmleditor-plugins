/**
 * @author Shea Frederick - http://www.vinylfox.com
 * @class Ext.ux.form.HtmlEditor.HR
 * @extends Ext.util.Observable
 * <p>A plugin that creates a button on the HtmlEditor for inserting a horizontal rule.</p>
 */
Ext.ux.form.HtmlEditor.HR = Ext.extend(Ext.util.Observable, {
	// private
	cmd: 'hr',
	// private
    init: function(cmp){
        this.cmp = cmp;
        this.cmp.on('render', this.onRender, this);
    },
	// private
    onRender: function() {
        var cmp = this.cmp;
        var btn = this.cmp.getToolbar().addButton({
          iconCls: 'x-edit-hr',
          handler: function() {
            this.hrWindow = new Ext.Window({
                title: 'Insert Rule',
                items: [{
                    itemId: 'insert-hr',
                    xtype: 'form',
                    border: false,
                    plain: true,
                    bodyStyle: 'padding: 10px;',
                    labelWidth: 60,
                    labelAlign: 'right',
                    items: [{
                        xtype: 'label',
                        html: 'Enter the width of the Rule in percentage<br/> followed by the % sign at the end, or to<br/> set a fixed width ommit the % symbol.<br/>&nbsp;'
                    },{
                        xtype: 'textfield',
                        maskRe: /[0-9]|%/,
                        regex: /^[1-9][0-9%]{1,3}/,
                        fieldLabel: 'Width',
                        name: 'hrwidth',
                        width: 60,
                        listeners: {
                            specialkey: function(f, e){
                                if (e.getKey() == e.ENTER || e.getKey() == e.RETURN){
                                    this.doInsertHR();
                                }
                            },
                            scope: this
                        }
                    }]
                }],
                buttons: [{
                    text: 'Insert',
                    handler: this.doInsertHR,
                    scope: this
                }, {
                    text: 'Cancel',
                    handler: function() {
                      this.hrWindow.close();
                    },
					scope: this
                }]
            }).show();
          },
          scope: this,
          tooltip: 'Insert Horizontal Rule'
        });
    },
	// private
    doInsertHR: function() {
        var frm = this.hrWindow.getComponent('insert-hr').getForm();
        if (frm.isValid()) {
            var hrwidth = frm.findField('hrwidth').getValue();
            if (hrwidth) {
                this.insertHR(hrwidth);
            }else{
                this.insertHR('100%');
            }
            this.hrWindow.close();
        }
    },
    /**
     * Insert a horizontal rule into the document.
     * @param w String The width of the horizontal rule as the <tt>width</tt> attribute of the HR tag expects. ie: '100%' or '400' (pixels).
     */
	insertHR: function(w){
		this.cmp.insertAtCursor('<hr width="'+w+'">');
	}
});