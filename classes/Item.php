<?php

class Item
{
	public $id;
	public $name;
	public $os;
	public $status;
	public $comment;
	public $history;

	public function __construct(
	$id = 0,
	$name = '',
	$os = '',
	$status = '',
	$date = '',
	$comment = '',
	$history = ''
	)
	{
		$this->id = $id;
		$this->name = $name;
		$this->os = $os;
		$this->status = $status;
		$this->date = $date;
		$this->comment = $comment;
		$this->history = $history;
	}
}