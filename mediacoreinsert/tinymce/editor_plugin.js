/**
 * @author MediaCore <info@mediacore.com>
 */

// TODO: Handle errors nicely if the chooser couldn't be loaded

(function() {
    // Load chooser
    // FIXME: use some site config for the url
    var script = document.createElement('script');
    script.src = "http://localhost:8080/api/chooser.js";
    (document.body || document.head || document.documentElement).appendChild(script);

    tinymce.PluginManager.requireLangPack('mediacoreinsert');

    tinymce.create('tinymce.plugins.MediaCoreInsertPlugin', {
        init : function(ed, pluginUrl) {
            var t = this;
            t.editor = ed;
            t.url = pluginUrl;

            // Register commands.
            ed.addCommand('mceMediaCoreInsert', function() {
                if (!t.chooser) {
                    t.chooser = mediacore.chooser.init();
                    t.chooser.on('media', function(media) {
                        var el = t.editor.dom.createHTML('a', {href : media.url}, media.title);
                        t.editor.execCommand('mceInsertContent', false, el);
                    });
                    t.chooser.on('error', function(err) {
                        throw err;
                    });
                }
                t.chooser.open();
            });

            // Register buttons.
            ed.addButton('mediacoreinsert', {
                title : 'mediacoreinsert.desc',
                image : t.url + '/img/icon.png',
                cmd : 'mceMediaCoreInsert'});

        },

        getInfo : function() {
            return {
                longname : 'MediaCore media',
                author : 'MediaCore <info@mediacore.com>',
                authorurl: 'http://mediacore.com',
                version : "1.0"
            };
        }

    });

    // Register plugin.
    tinymce.PluginManager.add('mediacoreinsert', tinymce.plugins.MediaCoreInsertPlugin);
})();
