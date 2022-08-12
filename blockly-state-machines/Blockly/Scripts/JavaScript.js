workspaceToCode = function (a) {

	a || (console.warn("No workspace specified in workspaceToCode call.  Guessing."),
		a = Blockly.getMainWorkspace());
	var b = []; this.init(a);
	a = a.getTopBlocks(!0);
	for (var c = 0, d; d = a[c]; c++) {
		var e = this.blockToCode(d);
		goog.isArray(e) && (e = e[0]);
		e && (d.outputConnection && this.scrubNakedValue && (e = this.scrubNakedValue(e)), b.push(e))
	}
	b = b.join("\n"); b = this.finish(b);
	b = b.replace(/^\s+\n/, ""); b = b.replace(/\n\s+$/, "\n");
	return b = b.replace(/[ \t]+\n/g, "\n")
};
