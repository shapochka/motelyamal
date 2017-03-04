function ajax() {};

ajax.prototype.init = function() 
{

	this.req_ = null;

	if (typeof window.XMLHttpRequest != "undefined")
		this.req_ = new XMLHttpRequest();
	else
	if (typeof ActiveXObject != "undefined") 
	{
	
		try 
		{
	
			this.req_ = new ActiveXObject("Microsoft.XMLHTTP");
		
		}
		catch (error1) 
		{
			if (this.req_ === null)
			try 
			{
				this.req_ = new ActiveXObject("Msxml.XMLHTTP");
			}
			catch (error2) 
			{
				this.req_ = null;
			}
		}
	}
}

ajax.prototype.isReady = function() 
{
	state = this.req_.readyState;
	return (state && (state < 4));
}

ajax.prototype.onRedyStateChangeFunc = function () 
{ 
	aj = this;
	if (this.req_.readyState == 1)
		aj.onLoading.call();

	if (this.req_.readyState == 4 && this.req_.status == 200)
			aj.onComplete.call(aj, aj.req_);
}

ajax.prototype.process = function (url, parameters, onComplete, onLoading) 
{
	this.onLoading = onLoading;
	this.onComplete = onComplete;
	
	aj = this;
	
	if (!this.req_) 
	{
		this.init();
	}
	
	this.req_.onreadystatechange = function () 
	{
		aj.onRedyStateChangeFunc.call(aj);
	}

	this.req_.open("POST", url, true);
	this.req_.send(parameters);

	return true;
}