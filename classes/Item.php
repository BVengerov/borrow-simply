<?php

class Item
{
	public function __construct(
		$id = 0,
		$name = '',
		$type = '',
		$os = '',
		$display = '',
		$resolution = '',
		$home = '',
		$status = '',
		$date = '',
		$account = '',
		$comment = '',
		$history = '',
		$udid = ''
	)
	{
		$this->id = $id;
		$this->name = $name;
		$this->type = $type;
		$this->os = $os;
		$this->display = $display;
		$this->resolution = $resolution;
		$this->home = $home;
		$this->status = $status;
		$this->date = $date;
		$this->account = $account;
		$this->comment = $comment;
		$this->history = $history;
		$this->udid = $udid;
	}
}