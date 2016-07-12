/**
 * WellcomeController
 *
 * @description :: Server-side logic for managing wellcomes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
        res.view('wellcome', {
            title: 'Wellcome'
        });
    }
};
